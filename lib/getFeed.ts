'use server'
import { auth } from "@clerk/nextjs";
import { db } from "./firebase";
import {
    doc,
    getDoc,
    collection,
    query,
    where,
    getDocs,
} from "@firebase/firestore";

// Function to get feed
export async function getFeed(): Promise<any[]> {
    const { userId } = auth();

    if (!userId) {
        // User is not logged in
        return [];
    }

    // Get the current user's following array
    const userDocRef = doc(db, "users", userId);
    const userDocSnapshot = await getDoc(userDocRef);
    const following = userDocSnapshot.data()?.following || [];

    // Query for posts where userId is in the following array
    const feedQuery = query(collection(db, "posts"), where("userId", "in", following.map(user => user.userId)));
    const feedSnapshot = await getDocs(feedQuery);

    // Extract posts from the query result
    const feed = feedSnapshot.docs.map(doc => doc.data().userPosts || []).flat();

    // Return the feed
    return feed;
}
