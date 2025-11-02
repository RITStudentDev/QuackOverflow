import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get_post } from "../mod/endpoints";

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
            <h1>{post.title || "Untitled"}</h1>
            <p><strong>Question:</strong> {post.question || "No question provided"}</p>
            <p><strong>Answer:</strong> {post.answer || "No answer provided"}</p>
            <p><strong>Author:</strong> {post.user?.username || "Unknown"}</p>
            <p><strong>Created At:</strong> {post.time_created ? new Date(post.time_created).toLocaleString() : "Unknown"}</p>
        </div>
    );
}
