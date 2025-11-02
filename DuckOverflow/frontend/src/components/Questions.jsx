import React, { useEffect, useState } from "react";
import { get_posts } from "../mod/endpoints";

export default function Questions(){

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [nextPage, setNextPage] = useState(1)

    const fetchData = async () => {
        const posts = await get_posts(nextPage)
        setPosts(posts.results)
    }

    useEffect(() => {
        try {
            fetchData()
        } catch {
            alert('error getting posts')
        } finally {
            setLoading(false)
        }
    })
    return (
        <div className="questions-page">
            <h1>Questions</h1>
            {
                loading?
                    <h2>Loading...</h2>
                :
                    posts ? 
                        posts.map((post) =>{
                            return <h2>{post.title}</h2>
                        })
                    :
                    <></>


            }
        </div>
    )
}