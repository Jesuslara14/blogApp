import { Link } from "react-router-dom"

export default function Post({props}){
    return(<div className="post">
        <h3>{props.title}</h3>
        <h5>By <Link to={`/profile/${props.authorId}`}>{props.author}</Link></h5>
        <p>Tags: {props.tags}</p>
        <img src={props.image} className="post-img"/>
        <p className="caption">{props.caption}</p>
    </div>
    )
}