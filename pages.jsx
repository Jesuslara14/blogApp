//Module Imports

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Post from "./subcomponents/post";
import axios from "axios";

//Stylesheet Imports

import '../assets/Home.css'

//Home page
export function HomePage(){
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/get-posts')
        .then(result => {
            setData(result.data.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, []);
    

    return(
        <>
            <h1>Home</h1>
            <hr/>
            <div className="posts">
                {data.map((item, index) => (
                    <Post
                        key={index}
                        props={{
                            title: item.title,
                            author: item.author,
                            caption: item.caption,
                            image: item.image,
                            tags: item.tags,
                            authorId: item.authorId
                        }}
                    />
                ))}
            </div>
        </>
    )
}

//Explore page
export function ExplorePage(){
    const [data, setData] = useState([]);
    const [userForm, setUserForm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault()
        axios.get(`http://localhost:4000/search-posts${userForm}`)
        .then(result => {
            setData(result.data.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleInput = (e) => {
        setUserForm(e.target.value);
    }

    return(
        <>
            <h1>Explore</h1>
            <form onSubmit={handleSearch}>
                <label htmlFor="searchTerm">Search a specific genre or term:</label><br />
                <input type="text" name="searchTerm" id="searchTerm" onChange={handleInput}/>
                <input type="submit" value="Search" />
            </form>
            <div className="posts">
                {data.map((item, index) => (
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
        </>
    )
}

//Bands
export function BandsPage(){
    const [data, setData] = useState([]);
    const [userForm, setUserForm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault()
        axios.get(`http://localhost:4000/search-bands${userForm}`)
        .then(result => {
            setData(result.data.data);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const handleInput = (e) => {
        setUserForm(e.target.value);
    }

    return(
        <>
            this page is currently under construction
            <h1>Discover Bands</h1>
            <form onSubmit={handleSearch}>
                Find bands by genre <br />
                <label htmlFor="name">Name</label> <input type="text" name="name" id="name" onChange={handleInput}/>
            </form>
            <button>Join Band</button>
            <hr />
            <div>

            </div>
        </>
    );
}

//Login
export function LoginPage({ toggleLogin, setCredentials }){
    const navigate = useNavigate();
    const [userForm, setUserForm] = useState({
        email: '',
        password: ''
    });

    const handleInput = (e) => {
        setUserForm((prevNext) => ({
            ...prevNext,
            [e.target.name]: e.target.value,
        }));
    };

    const handleOnSubmit = (e) => {
        e.preventDefault()
        axios
        .post('http://localhost:4000/log-user', {
            email: userForm.email,
            password: userForm.password
        })
        .then(async res => {
            if(res.data.status == 200){
                setCredentials(res.data.data);
                alert(res.data.message);
                toggleLogin(res.data.data.user_id);
                navigate('/');
            } else {
                alert(res.data.message);
            }
            setUserForm({
                email: '',
                password: ''
            });
        });
    };

    return(
        <>
            <h1>Login</h1>
            <hr />
            <form onSubmit={handleOnSubmit}>
                <label htmlFor="email">E-mail</label> <br />
                <input type="text" name="email" id="email" onChange={handleInput} value={userForm.email} pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" required/> <br />
                <label htmlFor="password">Password</label> <br />
                <input type="password" name="password" id="password" onChange={handleInput} value={userForm.password} pattern=".{5,10}" required/> <br />
                <input type="submit" value="Login"/>
            </form>
        </>
    );
}

//Register Page
export function RegisterPage({ toggleLogin, setCredentials}){
    const navigate = useNavigate();
    const [userForm, setUserForm] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleInput = (e) => {
        setUserForm((prevNext) => ({
            ...prevNext,
            [e.target.name]: e.target.value,
        }));
    };

    const handleOnSubmit = (e) => {
        e.preventDefault()
        axios
        .post('http://localhost:4000/register-user', userForm)
        .then(res => {
            if(res.data.status == 200){
                setCredentials(res.data.data);
                alert(res.data.message);
                toggleLogin(res.data.data.user_id);
                navigate('/');
            }else{
                alert(res.data.message);
            }
            setUserForm({
                username: '',
                email: '',
                password: ''
            });
        });
    };

    return(
        <>
            <h1>Register</h1>
            <hr />
            <form onSubmit={handleOnSubmit}>
                <label htmlFor="username">Username</label> <br />
                <input type="text" name="username" id="username" onChange={handleInput} value={userForm.username} required /> <br />
                <label htmlFor="email">Email</label> <br />
                <input type="email" name="email" id="email" onChange={handleInput} value={userForm.email} pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" required/> <br />
                <label htmlFor="password">Password</label> <br />
                <input type="password" name="password" id="password" onChange={handleInput} value={userForm.password} pattern=".{5,10}" required/> <br />
                <input type="submit" value="Register" />
            </form>
        </>
    );
}