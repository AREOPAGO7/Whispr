// src/services/postService.ts
import { collection, addDoc, getDocs, query, orderBy, limit, startAfter } from "firebase/firestore";
import { db } from "../firebase/config";

const postsCollectionRef = collection(db, "posts");
const POSTS_PER_PAGE = 5;

/** Create a new post */
export const createPost = async (post: any) => {
  try {
    const docRef = await addDoc(postsCollectionRef, post);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

/** Get all posts ordered by timestamp */
export const getPosts = async (lastPost = null) => {
  try {
    let postsQuery;

    if (lastPost) {
      postsQuery = query(
        postsCollectionRef,
        orderBy('timestamp', 'desc'),
        startAfter(lastPost),
        limit(POSTS_PER_PAGE)
      );
    } else {
      postsQuery = query(
        postsCollectionRef,
        orderBy('timestamp', 'desc'),
        limit(POSTS_PER_PAGE)
      );
    }

    const snapshot = await getDocs(postsQuery);
    const posts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    const lastVisible = snapshot.docs[snapshot.docs.length - 1];

    return {
      posts,
      lastVisible
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};
