'use server'
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
    followers: { name: string; userId: string }[];
    following: { name: string; userId: string }[];
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
    let userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
        // User is new, add to 'users' collection
        await setDoc(userRef, {
            name: user?.username,
            userId: userId,
            followers: [],
            following: [],
        });

        userDoc = await getDoc(userRef);

    }

    // Return the user details
    return userDoc.data() as UserDetails;
}



export async function getUserPosts(): Promise<UserPost[]> {
    const { userId } = auth();
    const user = await currentUser();
    if (!userId) {
        // User is not logged in
        return null;
    }

    const userDocRef = doc(db, "posts", userId);
    let userDocSnapshot = await getDoc(userDocRef);

    if (!userDocSnapshot.exists()) {
        await setDoc(userDocRef, {
            userId: userId,
            name: user?.username
        });

        userDocSnapshot = await getDoc(userDocRef);
    }

    const userPostsMap: Record<string, UserPost> = userDocSnapshot.data()?.userPosts || {};

    // Convert the userPosts map into an array of posts with id
    const userPostsArray: UserPost[] = Object.entries(userPostsMap).map(([id, post]) => ({
        id,
        ...post,
    }));

    // Sort the posts array based on the id (timestamp) in descending order
    const sortedUserPostsArray = userPostsArray.sort((a, b) => parseInt(b.id, 10) - parseInt(a.id, 10));

    return sortedUserPostsArray;
}


