'use server'
import { auth } from "@clerk/nextjs";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

interface UserDetails {
    name: string;
    userid: string;
    followers: { name: string; userId: string }[];
    following: { name: string; userId: string }[];
}

// Function to get all users
export async function getAllUsers(): Promise<UserDetails[]> {
    const { userId } = auth();
    if (!userId) {
        // User is not logged in
        return [];
    }

    const usersCollection = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollection);

    const allUsers: UserDetails[] = [];
    usersSnapshot.forEach((doc) => {
        const userData = doc.data() as UserDetails;
        allUsers.push({ ...userData });
    });

    return allUsers;
}
