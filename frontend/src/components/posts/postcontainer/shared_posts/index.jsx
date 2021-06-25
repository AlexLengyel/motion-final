import styled from "styled-components";
import img from "../../../../assets/img.png";
import TimeAgo from "react-timeago";
import {PostWrapper} from "../styled";
import menu from "../../../../assets/posts/menu.svg";

const SharedPostWrapper = styled(PostWrapper)`
  width: 100%;
  border-left: 1px solid lightgray;
  border-radius: 0;
`

const SharedPost = props => {
    const defaultAvatar = 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png';
    // destructuring props
    const { author, content, created, images } = props.post

    return(
        <SharedPostWrapper>
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
            </div>
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
        </SharedPostWrapper>
    )
}

export default SharedPost