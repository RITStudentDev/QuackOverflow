import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get_post } from "../mod/endpoints";
import Post from "./Post";
import '../styles/PostDetails.css'

export default function PostDetails() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await get_post(id);
                if (!data) {
                    setError("Post not found");
                } else {
                    setPost(data);
                }
            } catch (err) {
                console.error("Error fetching post:", err);
                setError("Error fetching post");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2>{error}</h2>;

    return (
        <div className="post-details-page">
            <Post
              username={post.username}
              title={post.title}
              question={post.question}
              answer={post.answer}
              time_created={post.time_created}
              likes={post.likes}
              like_count={post.like_count}
            />
        </div>
    );
}
