import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const ListUsersCard = ({ userDetails, currentUser }) => {
    return (
        <div >
            <Card className="w-auto h-auto justify-between flex flex-col">
                <CardHeader className="order-first">
                    <CardTitle className="text-lg text-slate-600 font-semibold">{userDetails.name}</CardTitle>
                    <span className=" text-xs text-slate-400">Following: {userDetails.following.length}</span>
                </CardHeader>
            </Card>
        </div>
    )
}

export default ListUsersCard