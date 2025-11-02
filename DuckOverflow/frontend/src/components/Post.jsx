import '../styles/Post.css'

const Post = ({username, title, question, answer, time_created, likes, like_count}) => {
    return (
        <div className="post-container">
            <div className='manage-content'>
                <div className='data-container'>
                    <h1 className="post-title">{title}</h1>
                    <div className='user-data'>
                        <p>By: {username}</p>
                        <p>{time_created}</p>
                    </div>
                    <p>{question}</p>
                    <p>Answer: {answer}</p>
                </div>
            </div>
        </div>
    )
}

export default Post;