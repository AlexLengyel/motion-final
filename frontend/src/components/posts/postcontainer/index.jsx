import { PostWrapper } from './styled';
import heart from '../../../assets/posts/heart.svg';
import likedheart from '../../../assets/posts/likedheart.svg'
import share from '../../../assets/posts/share.svg';
import menu from '../../../assets/posts/menu.svg';
import TimeAgo from 'react-timeago';
import Axios from '../../../Axios';
import { useState } from 'react'
import EditPost from '../postcontainer/editpost'
import { useDispatch } from 'react-redux'


const Post = props => {
    const dispatch = useDispatch();
    // destructuring post
    const { author, images, amount_of_likes, content, created,  logged_in_user_liked, is_from_logged_in_user, id } = props.post;

    const [editToggle, setEditToggle] = useState(false)
    const [totalLikes, setTotalLikes] = useState(amount_of_likes)
    const [userLikes, setUserLikes] = useState(logged_in_user_liked)
    
    const likePost = async (ID) => {
        const url = `/social/posts/toggle-like/${ID}/`;
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        };
        try {
            const response = await Axios.post(url, null, config);
            console.log(response);
            userLikes ? setTotalLikes(totalLikes-1) : setTotalLikes(totalLikes+1);
            setUserLikes(!userLikes)
            if (userLikes) {
                const action = {
                    type: 'LIKED_POSTS',
                    payload: ID,
                    task: 'DECREMENT',
                }
                dispatch(action)
            }
        } catch (e) {
            console.log(e);
        }
    };

    const defaultAvatar = 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png';
    return (
        <PostWrapper>
            <div className="post-upper">
                <div className="top-left-container">
                    <div className="left-side">
                        <img className="avatar" src={author.avatar ? author.avatar : defaultAvatar} alt="profile pic" />
                    </div>
                    <div className="left-side" style={{ 'margin-left': '20px' }}>
                        <span>
                            {author['first_name']} {author['last_name']}
                        </span>
                        <TimeAgo className="small-font" date={created} />
                    </div>
                </div>
                <div>
                    {is_from_logged_in_user? (
                        <button className="post-interact" onClick={() => setEditToggle(!editToggle)}>
                            <img src={menu} alt="menu" />
                        </button>
                    ) : null}
                </div>
            </div>
            {editToggle ? <EditPost id={id} close={setEditToggle}/> : null}
            <div className="userpost">
                <p>{content}</p>
            </div>
            {images ? (
                <div className="grid-component">
                    {images.map((image, index) => (
                        <img key={image.image} src={image.image} alt="img" />
                    ))}
                </div>
            ) : null}
            <div className="likes">
                <div className="like-share">
                    <div className="interactive" style={{ 'margin-right': '20px' }}>
                        <img src={userLikes ? likedheart : heart} alt="heart" />
                        <button onClick={() => likePost(id)} className="post-interact" style={{ 'margin-left': '10px' }}>
                            Like
                        </button>
                    </div>
                    <div className="interactive">
                        <img src={share} alt="share" />
                        <button className="post-interact" style={{ 'margin-left': '10px' }}>
                            Share
                        </button>
                    </div>
                </div>
                <div className="like-counter">
                    <span className="small-font">
                        {totalLikes} {totalLikes > 1 || totalLikes === 0 ? `likes` : `like`}
                    </span>
                </div>
            </div>
        </PostWrapper>
    );
};

export default Post;
