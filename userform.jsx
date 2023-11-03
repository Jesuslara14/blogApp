import { useState } from "react";
import axios from "axios";

export default function UpdateUser({ user }){
    const cloud_name = 'dv934lt48';
    const [formOpen, setFormOpen] = useState(false);
    const [userImage, setImage] = useState(user.avatar);
    const [userForm, setUserForm] = useState({
        username: user.username,
        bio: user.bio,
        avatar: user.avatar
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
        .post(`http://localhost:4000/edit-user${user.user_id}`, {
            username: userForm.username,
            bio: userForm.bio,
            avatar: userImage || 'https://res.cloudinary.com/dv934lt48/image/upload/v1698783479/eps5geyfm5ikoa1xcpjm.gif'
        })
        .then(res => {
            console.log(res.data);
            setUserForm({
                username: '',
                bio: '',
                avatar: ''
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
            userForm.avatar = imageurl
            setImage(imageurl)
          });
      }

    if(!formOpen){
        return(
            <>
                <button onClick={handleOpenForm}>Edit User</button>
            </>
        );
    } else {
        return(
            <>
                <button onClick={handleCloseForm}>Cancel</button>
                <form onSubmit={handleOnSubmit}>
                <label htmlFor="username">Username</label> <br />
                <input type="text" name="username" id="username" onChange={handleInput} value={userForm.username} required/> <br />
                <label htmlFor="bio">Bio</label> <br />
                <textarea name="bio" id="bio" cols="30" rows="10" className='text-box' onChange={handleInput} value={userForm.bio}></textarea> <br />
                <input type="file" name="file" accept="image/*" onChange={cloudHandler}/>
                <input type="submit" value="Update" />
                </form>
            </>
        );
    }
}