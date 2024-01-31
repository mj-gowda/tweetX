'use client'
import { auth, currentUser } from "@clerk/nextjs";
import { db } from "./firebase";
import {
    doc,
    getDoc,
    onSnapshot,
    setDoc
} from "firebase/firestore";

interface UserDetails {
    name: string;
    userid: string;
    followers: string[];
    following: string[];
    id: string;
}

interface UserPost {
    id: string;
    content: string;
}

// Function to get user details and add to users collection if new
export async function getUserDetails(): Promise<UserDetails | null> {
    const { userId } = auth();
    const user = await currentUser();
    if (!userId) {
        // User is not logged in
        return null;
    }

    // Reference to the user document in the 'users' collection
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
        // User is new, add to 'users' collection
        await setDoc(userRef, {
            name: user?.username,
            userId: userId,
            followers: [],
            following: [],
        });

    }

    // Return the user details
    return userDoc.data() as UserDetails;
}



export async function getUserPostsRealtime(userId: string, callback: (userPosts: UserPost[]) => void): Promise<() => void> {
    const userDocRef = doc(db, "posts", userId);

    // Subscribe to real-time updates using onSnapshot
    const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
        const userPostsMap: Record<string, UserPost> = snapshot.data()?.userPosts || {};

        // Convert the userPosts map into an array of posts with id
        const userPostsArray: UserPost[] = Object.entries(userPostsMap).map(([id, post]) => ({
            id,
            ...post,
        }));

        // Sort the posts array based on the id (timestamp) in descending order
        const sortedUserPostsArray = userPostsArray.sort((a, b) => parseInt(b.id, 10) - parseInt(a.id, 10));

        // Call the callback function with the updated posts array
        callback(sortedUserPostsArray);
    });

    return unsubscribe;
}


