/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { PostsHome, NewPost, NewPostButton, ButtonContainer, NewPostForm, PostContainer } from './styled';
import Popup from './popups/newpost';
import { useRef, useState, useEffect } from 'react';
import Axios from './../../Axios';
import { useDispatch, useSelector } from 'react-redux';
import Masonry from 'react-masonry-css';
import Post from './postcontainer';
import send from '../../assets/posts/send.svg';
import { fetchPosts, fetchUserdata } from '../../Axios/fetches';
import SearchBar from '../posts/searchbar'
import Avatar from "../../styles/Avatar";

const Posts = () => {
    const [popup, setPopup] = useState(false);
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts);
    const userData = useSelector(state => state.userData);

    // fetches posts upon rendering
    useEffect(() => {
        dispatch(fetchUserdata);
        dispatch(fetchPosts);
    },[]);


    return (
        <PostsHome>
            <SearchBar/>
            <PostContainer>
                <Masonry breakpointCols={2} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
                    <NewPost>
                        <div className='newpost-right'>
                            <Avatar user={userData.avatar} user_id={userData.id} alt='profile pic' width={'55px'} height={'55px'}/>
                            <p onClick={() => setPopup(!popup)}>{`What's on your mind, ${userData['first_name']}?`}</p>
                        </div>
                        <ButtonContainer>
                            <NewPostButton>
                                <img src={send} />
                            </NewPostButton>
                        </ButtonContainer>
                        <Popup toggle={popup} close={setPopup} userData={userData} />
                    </NewPost>
                    {posts.map(post => (
                        <Post key={post.id} post={post}/>
                    ))}
                </Masonry>
            </PostContainer>
        </PostsHome>
    );
};

export default Posts;