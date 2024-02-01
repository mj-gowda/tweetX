'use client'
import { useEffect, useState } from 'react';
import { getFeed } from '@/lib/getFeed';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { createUserPost } from '@/lib/createPost';
import { useToast } from '@/components/ui/use-toast';
import ListFeedCard from '@/components/ListFeedCard';

const FormSchema = z.object({
  post: z
    .string()
    .min(10, {
      message: "post must be at least 10 characters.",
    })
    .max(100, {
      message: "post must not be longer than 100 characters.",
    }),
})


export default function Page() {
  const { toast } = useToast()
  const [feedData, setFeedData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getFeed();
        setFeedData(result);

      } catch (error) {
        console.error('Error fetching feed:', error);
      }
    };

    fetchData();
  }, []);


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })


  function onSubmit(data: z.infer<typeof FormSchema>) {
    const postContent = data?.post;


    createUserPost(postContent)
      .then(() => {
        toast({
          description: "Your post has been published.",
        })
      })
      .catch((error) => {
        console.error('Error creating post:', error);
        toast({
          variant: "destructive",
          description: "Error creating post.",
        })
      });
  }



  return (
    <div className='flex flex-col items-center mt-4 sm:mt-10'>
      <Dialog>
        <DialogTrigger asChild>
          <Button className=' h-7 sm:h-10 px-4 sm:px-8 bg-rose-400 hover:bg-rose-500'>Write</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Post</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
              <FormField
                control={form.control}
                name="post"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Create your post"
                        className="resize-none sm:h-[92px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className=' h-7 sm:h-10 px-4 sm:px-8 bg-rose-400 hover:bg-rose-500' type="submit">Publish Post</Button>
            </form>
          </Form>
          <DialogClose asChild>
            <Button onClick={() => form.reset()} type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      <div className='sm:w-1/2'>
        {feedData && feedData.map((item, index) => (
          <div key={index} className='w-full'>
            <ListFeedCard userPosts={item.userPosts} name={item.name} />
          </div>
        ))}
      </div>
    </div>
  );
}