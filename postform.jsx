import { useState } from 'react';
import axios from 'axios'

export default function PostForm({ credentials }){
    const cloud_name = 'dv934lt48';
    const [formOpen, setFormOpen] = useState(false);
    const [userImage, setImage] = useState();
    const [userForm, setUserForm] = useState({
        title: '',
        caption: '',
        tags: '',
        image: ''
    });

    const handleOpenForm = () => {
        setFormOpen(true);
    }

    const handleCloseForm = () => {
        setFormOpen(false);
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        setFormOpen(false);
        axios
        .post('http://localhost:4000/create-post', {
            title: userForm.title,
            caption: userForm.caption,
            tags: userForm.tags,
            image: userImage || 'https://res.cloudinary.com/dv934lt48/image/upload/v1698783479/eps5geyfm5ikoa1xcpjm.gif',
            author: credentials.username,
            authorId: credentials.user_id
        })
        .then(res => {
            console.log(res.data);
            setUserForm({
                title: '',
                caption: '',
                tags: '',
                image: ''
            })
        })
    };

    const handleInput = (e) => {
        setUserForm((prevNext) => ({
            ...prevNext,
            [e.target.name]: e.target.value,
        }));
    };

    const cloudHandler = (e) => {
        const formData = new FormData();

        formData.append('file', e.target.files[0]);
        formData.append("upload_preset", 'Blogimages');


      axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
          .then((res) => {
            const imageurl = res.data.secure_url;
            userForm.image = imageurl
            setImage(imageurl)
          });
      }

    if(!formOpen){
        return(
            <>
                <button onClick={handleOpenForm}>Create Post</button>
            </>
        );
    } else {
        return(
            <>
                <button onClick={handleCloseForm}>Cancel</button>
                <form onSubmit={handleOnSubmit}>
                <label htmlFor="title">Title</label> <br />
                <input type="text" name="title" id="title" onChange={handleInput} required/> <br />
                <label htmlFor="caption">Caption</label> <br />
                <textarea name="caption" id="caption" cols="30" rows="10" className='text-box' onChange={handleInput}></textarea> <br />
                <label htmlFor="tags">Tags {"(separate by a comma. use dashes - as spaces for multi word tags)"}</label> <br />
                <input type="text" name="tags" id="tags" onChange={handleInput}/> <br />
                <input type="file" name="file" accept="image/*" onChange={cloudHandler}/>
                <input type="submit" value="Post" />
                </form>
            </>
        );
    }
}