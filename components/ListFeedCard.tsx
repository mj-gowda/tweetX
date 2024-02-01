import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import ListUserPosts from "./ListUserPosts";
import { Separator } from "@radix-ui/react-separator";

interface UserPost {
    id: string;
    content: string;
}

const ListUsersCard = ({ userPosts, name }) => {
    const userPostsArray = Object.entries(userPosts).map(([id, post]: [string, UserPost]) => ({
        id,
        ...post
    }));

    // Sort the posts array based on the id (timestamp) in descending order
    const sortedUserPostsArray = userPostsArray.sort((a, b) => parseInt(b.id, 10) - parseInt(a.id, 10));


    return (
        <div>
            {sortedUserPostsArray && sortedUserPostsArray.map((post, index) => (
                <div className=' w-full my-2' key={index}>
                    <ListUserPosts post={post} name={name} />
                    <Separator />
                </div>
            ))}
        </div>
    )
}

export default ListUsersCard