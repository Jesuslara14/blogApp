import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostForm from './subcomponents/postform'
import UpdateUser from './subcomponents/userform'
import Post from './subcomponents/post'
import axios from 'axios'
import '../assets/Profile.css'

export default function ProfilePage({ credentials }){
    const [profileDisplayed, setProfileDisplayed] = useState({});
    const [profilePosts, setProfilePosts] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:4000/search-user${id}`)
        .then(res => {
            if(res.data.status == 200){
                setProfileDisplayed(res.data.data);
            } else {
                alert(res.data.message);
            }
        });
        axios.get(`http://localhost:4000/search-user-posts${id}`)
        .then(res => {
            setProfilePosts(res.data.data);
        })
    }, []);
    
    return(
        <>
            <div className='profile-card'>
                <div className='profile-info'>
                    <h1>{profileDisplayed.username}</h1>
                    <p>{profileDisplayed.bio}</p>
                </div>
                <img src={profileDisplayed.avatar} className="user-pfp" />
            </div>
            <div>
                <div>
                    {credentials.user_id == profileDisplayed.user_id ? <UpdateUser user={profileDisplayed} setProfile={setProfileDisplayed} /> : null}
                    {credentials.user_id == profileDisplayed.user_id ? <PostForm credentials={profileDisplayed} /> : null}
                </div>
                <hr />
                <div className="posts">
                    {profilePosts.map((item, index) => (
                        <Post
                            key={index}
                            props={{
                                title: item.title,
                                author: item.author,
                                image: item.image,
                                caption: item.caption,
                                tags: item.tags,
                                authorId: item.authorId
                            }}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}