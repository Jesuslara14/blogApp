import '../assets/Navbar.css'
import { Link } from "react-router-dom";

export default function Navbar({ links, mustLogin }){
    return(
        <>
            <nav>
                <div className="navContent">
                    <div className="navUserCard">
                        <img src={mustLogin.avatar} className='navUserAvatar'/> <br />
                        <Link to={mustLogin.username == ''? '/log-in' : `/profile/${mustLogin.user_id}`}>{mustLogin.username == ''? 'Login' :mustLogin.username}</Link>
                    </div>
                </div>
                <div className="navLinks">
                    {links.map(link => {
                        return(
                            <div className="link" key={link.key}>
                                <Link to={link.link}>{link.name}</Link>
                            </div>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}