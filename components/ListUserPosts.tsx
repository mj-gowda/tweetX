import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const ListUserPosts = ({ post, currentUser }) => {
    function calculateTimeAgo(timestamp: number): string {
        const currentTimestamp = Date.now();
        const postTimestamp = new Date(timestamp).getTime();

        const timeDifference = currentTimestamp - postTimestamp;
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days} days ago`;
        } else if (hours > 0) {
            return `${hours} hr ago`;
        } else if (minutes > 0) {
            return `${minutes} min ago`;
        } else {
            return `${seconds} sec ago`;
        }
    }

    return (
        <div>
            <Card className="w-full h-auto shadow-md flex flex-col">
                <CardHeader className=" flex flex-row justify-between">
                    <CardTitle className="order-first text-base sm:text-lg text-slate-500 font-semibold">{currentUser.name}</CardTitle>
                    <span className="order-last text-xs text-slate-400">{calculateTimeAgo(parseInt(post.id, 10))}</span>
                </CardHeader>
                <CardContent className="text-xs sm:text-sm text-slate-400">
                    <p>{post.content}</p>
                </CardContent>
            </Card>
        </div>
    )
}

export default ListUserPosts