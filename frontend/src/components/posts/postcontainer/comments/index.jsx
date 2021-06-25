import img from "../../../../assets/img.png";
import {useRef, useState} from "react";
import Axios from "../../../../Axios";
import {ListComments, NewComment} from "./styled";
import { useDispatch, useSelector} from "react-redux";
import {AllComments, newComment} from "../../../../store/actionCreators";
import TimeAgo from "react-timeago";
import Avatar from "../../../../styles/Avatar";

const Comments = props => {
    const [showComments, setToggle] = useState(false)
    const dispatch = useDispatch()
    const comments = useSelector(state => state.postComments)
    const imageRef = useRef();
    const commentRef = useRef();

    const createComment = async (postID) => {
        const url = `social/comments/${postID}/`
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        };
        const img = imageRef.current.files[0]
        let form = new FormData();
        if (img) form.append('images', img)
        form.append('text', commentRef.current.value)

        commentRef.current.value = ''
        imageRef.current.value = []

        const response = await Axios.post(url, form, config);
        dispatch(newComment(response.data))
    }

    const fetchAllComments = async (postID) => {
        const url = `social/comments/${postID}/`
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        };
        const response = await Axios.get(url, config)
        dispatch(AllComments(response.data))
    }

    return(
        <>
            <NewComment>
                <input className="comment-text" type="text" placeholder="Write a comment..." ref={commentRef}
                    onKeyDown={e => e.key === 'Enter' ? createComment(props.id) : null}/>
                <label className="comment-image">
                <img src={img} alt="profile"/>
                <input type="file" accept="image/png, image/jpeg" ref={imageRef}/>
                </label>
            </NewComment>
            <ListComments>
                <div className="toggle-display">
                    <button onClick={() => {setToggle(!showComments); fetchAllComments(props.id)}}>
                        { showComments ? 'Hide comments' : 'View comments'}
                    </button>
                </div>
                { showComments ? comments.map(comment =>
                        <>
                        <div>
                            <div className="text-wrapper">
                                <Avatar className="profile-pic" user={comment.author.avatar} marginRight={'3px'} alt="pp"/>
                                <div className="comment-body">
                                    <div className="info">
                                        <span>{comment.author.first_name} {comment.author.last_name}</span>
                                        <TimeAgo class="timestamp" date={comment.created} />
                                    </div>
                                    <p>{comment.text}</p>
                                </div>
                            </div>
                            { comment.images ?
                            <div className="image-wrapper">
                                <img src={comment.images} alt="comment"/>
                            </div> : null }
                        </div>
                        </>
                        ) : null}
            </ListComments>
        </>
    )
}

export default Comments