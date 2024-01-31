'use client'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { updateFollowing } from "@/lib/updateFollowing";
import { useState } from 'react';

const ListUsers = ({ userDetails, currentUser }) => {
    const [isFollowing, setIsFollowing] = useState(
        currentUser?.following.some(user => user.userId === userDetails.userid)
    );

    const handleFollow = async () => {
        // Call the function to update following
        await updateFollowing({ userDetails });
        // Update the state to reflect the change immediately
        setIsFollowing(true);
    }

    return (
        <div>
            <Card className="w-auto h-auto justify-between shadow flex flex-row">
                <CardHeader className="order-first">
                    <CardTitle className="text-lg text-slate-600 font-semibold">{userDetails.name}</CardTitle>
                    <span className=" text-xs text-slate-400">Following: {userDetails.following.length}</span>
                </CardHeader>
                <CardFooter className="order-last">
                    {isFollowing ? (
                        <Button size={"sm"} className="px-3 sm:w-24 h-7 sm:h-9 sm:px-6 text-white font-semibold bg-rose-400 hover:bg-rose-400">Following</Button>
                    ) : (
                        <Button onClick={handleFollow} size={"sm"} className="px-3 h-7 sm:h-9 sm:px-6 text-white font-semibold bg-rose-400  hover:bg-rose-500">Follow</Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}

export default ListUsers;