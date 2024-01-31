
import { getAllUsers } from '@/lib/getUsers';
import ListUsers from '@/components/ListUsers';
import { getUserDetails } from '@/lib/getProfile';
import { Separator } from '@/components/ui/separator';

const Users = async () => {
    const usersData = await getAllUsers();
    const currentUser = await getUserDetails();
    console.log('users page')
    return (
        <div className='pt-6'>
            <div className='flex flex-col items-center gap-2 '>
                {usersData.map((user, index) => (
                    <div className='sm:w-1/2 w-full justify-between' key={index}>
                        <ListUsers userDetails={user} currentUser={currentUser} />
                        <Separator />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Users;
