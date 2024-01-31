'use client'
import { useEffect, useState } from "react";
import { getUserDetails, getUserPostsRealtime } from '@/lib/getProfile';
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ListUserPosts from '@/components/ListUserPosts';

const Profile = () => {
    console.log('profile page');
    const [userDetails, setUserDetails] = useState(null);
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const details = await getUserDetails();
            setUserDetails(details);

            const unsubscribe = await getUserPostsRealtime(details?.userid, (posts) => {
                setUserPosts(posts);
            });

            return () => {
                // Unsubscribe when component unmounts
                unsubscribe();
            };
        };

        fetchData();
    }, []);

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
                                <ListUserPosts post={post} currentUser={userDetails} />
                                <Separator />
                            </div>
                        ))}
                    </TabsContent>
                    <TabsContent value="Followers">
                        {userDetails && userDetails.followers.map((follower, index) => (
                            <div key={index}>
                                <p>{follower.name} ({follower.userId})</p>
                            </div>
                        ))}
                    </TabsContent>
                    <TabsContent value="Following">
                        {userDetails && userDetails.following.map((followed, index) => (
                            <div key={index}>
                                <p>{followed.name} ({followed.userId})</p>
                            </div>
                        ))}
                    </TabsContent>
                </Tabs>
            </div>
        </div >
    );
};

export default Profile;
