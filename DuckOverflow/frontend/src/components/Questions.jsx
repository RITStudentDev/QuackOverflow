import React, { useEffect, useState } from "react";
import { get_posts } from "../mod/endpoints";

export default function Questions() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [nextPage, setNextPage] = useState(1)

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await get_posts(nextPage)
                setPosts(data.results || [])
            } catch (err) {
                console.error('Error getting posts:', err)
                alert('Error getting posts')
            } finally {
                setLoading(false)
            }
        }

        loadPosts()
    }, [nextPage])

    return (
        <div className="questions-page">
            <h1>Questions</h1>
            {loading ? (
                <h2>Loading...</h2>
            ) : posts.length > 0 ? (
                posts.map((post) => <h2 key={post.id}>{post.title}</h2>)
            ) : (
                <h2>No posts found</h2>
            )}
        </div>
    )
}
