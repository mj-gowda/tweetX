'use server'

import { currentUser } from "@clerk/nextjs";
import { DocumentData, DocumentReference, doc, setDoc } from "@firebase/firestore";
import { db } from "./firebase";


interface UserPost {
    id: string;
    content: string;
}

// Function to add a post for a user with a timestamp
export async function createUserPost(postContent: string): Promise<void> {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
        throw new Error("User not authenticated.");
    }

    const userDocRef = doc(db, "posts", userId);

    // Create a new post with content and timestamp
    const newPost = {
        [Date.now().toString()]: { // Using timestamp as the key
            content: postContent,
        },
    };

    // Update the user document with the new post
    await setDoc(userDocRef, {
        userPosts: newPost,
    }, { merge: true });
}

// function setDoc(userDocRef: DocumentReference<DocumentData, DocumentData>, arg1: {
//     userPosts: {
//         [x: string]: { // Using timestamp as the key
//             content: string;
//         };
//     };
// }, arg2: { merge: boolean; }) {
//     throw new Error("Function not implemented.");
// }
