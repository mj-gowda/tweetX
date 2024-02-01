'use server'

import { auth, currentUser } from "@clerk/nextjs";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export const updateFollowing = async ({ userDetails }) => {
    try {
        const { userId: currentUserId } = auth();

        if (!currentUserId) {
            // User is not logged in
            return null;
        }


        const currentUserDocRef = doc(db, "users", currentUserId);
        const targetUserDocRef = doc(db, "users", userDetails.userId);

        // Fetch current user document
        const currentUserDocSnapshot = await getDoc(currentUserDocRef);
        const currentUserData = currentUserDocSnapshot.data();

        // Check if the current user's following array already contains the target user
        const isAlreadyFollowing = currentUserData.following.some(user => user.userId === userDetails.userId);

        if (!isAlreadyFollowing) {
            // Update the current user's following array with the new user object
            await updateDoc(currentUserDocRef, {
                following: arrayUnion({
                    userId: userDetails.userId,
                    name: userDetails.name
                })
            });

            // Update the target user's followers array with the current user object
            await updateDoc(targetUserDocRef, {
                followers: arrayUnion({
                    userId: currentUserId,
                    name: currentUserData.name
                })
            });

            console.log(`Successfully updated following for ${currentUserId}`);
        } else {
            console.log(`User ${currentUserId} is already following ${userDetails.userId}`);
        }
    } catch (error) {
        console.error("Error updating following:", error);
    }
};
