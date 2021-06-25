import { MainContainer } from './styled';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Masonry from 'react-masonry-css';
import Post from '../../../posts/postcontainer';
import {fetchUserdata} from '../../../../Axios/fetches';
import testbanner from '../../../../assets/testbanner.jpg';
import ProfileInfo from "../../profile components/profileinfo";
import {BannerIMG} from "../../profile components/banner/styled";

const UserProfilePage = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userData);
    const userPosts = useSelector(state => state.userPosts);
    useEffect(() => {
        dispatch(fetchUserdata);
    }, [dispatch]);

    return (
        <MainContainer>
            <BannerIMG src={userInfo.banner ? userInfo.banner : testbanner} alt="banner" />
            <ProfileInfo/>
            <div className="my-posts">
                <Masonry breakpointCols={2} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
                    {userPosts.map((post, index) =>
                        <Post key={post.id} post={post}/>)}
                </Masonry>
            </div>
        </MainContainer>
    );
};

export default UserProfilePage;
