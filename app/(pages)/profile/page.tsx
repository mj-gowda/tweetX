import { getUserDetails, getUserPosts } from '@/lib/getProfile';
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import ListUserPosts from '@/components/ListUserPosts';


const Profile = async () => {
    console.log('profile page')
    const userDetails = await getUserDetails();
    const userPosts = await getUserPosts();


    return (
        <div className='md:mx-20 flex flex-col items-center '>
            {userDetails && (
                <div className='flex flex-col my-4 md:m-10 items-center sm:w-1/2'>
                    <h1 className='text-2xl sm:text-3xl text-gray-500 font-bold '>{userDetails.name}</h1>
                    <div className=''>
                        <p className='flex flex-row my-2 text-gray-500 text-xs sm:text-sm gap-6'>
                            <span>Posts: {userPosts.length}</span>
                            <span>Followers: {userDetails.followers.length}</span>
                            <span>Following: {userDetails.following.length}</span>
                        </p>
                    </div>
                    <Separator />
                </div>
            )}
            <div className='w-auto'>
                <Tabs className="flex flex-col items-center">
                    <TabsList className=' justify-around'>
                        <TabsTrigger value="Posts">Posts</TabsTrigger>
                        <TabsTrigger value="Followers">Followers</TabsTrigger>
                        <TabsTrigger value="Following">Following</TabsTrigger>
                    </TabsList>
                    <TabsContent value="Posts" className='w-full'>
                        {userPosts && userPosts.map((post, index) => (
                            <div className=' w-full justify-between' key={index}>
                                <ListUserPosts post={post} name={userDetails.name} />
                                <Separator />
                            </div>
                        ))}
                    </TabsContent>
                    <TabsContent value="Followers" className='w-full'>
                        {userDetails && userDetails.followers.map((follower, index) => (
                            <div key={index}>
                                <Card className="w-full h-auto shadow-md flex flex-col">
                                    <CardHeader className=" flex flex-row justify-between">
                                        <CardTitle className="order-first text-base sm:text-lg text-slate-500 font-semibold">{follower.name}</CardTitle>
                                    </CardHeader>
                                </Card>
                                <Separator />
                            </div>
                        ))}
                    </TabsContent>
                    <TabsContent value="Following" className='w-full'>
                        {userDetails && userDetails.following.map((following, index) => (
                            <div key={index}>
                                <Card className="w-full h-auto shadow-md flex flex-col">
                                    <CardHeader className=" flex flex-row justify-between">
                                        <CardTitle className="order-first text-base sm:text-lg text-slate-500 font-semibold">{following.name}</CardTitle>
                                    </CardHeader>
                                </Card>
                                <Separator />
                            </div>
                        ))}
                    </TabsContent>
                </Tabs>
            </div>
        </div >
    );
};

export default Profile;