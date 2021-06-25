import { MainContainer } from './styled';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Masonry from 'react-masonry-css';
import {fetchUserdata} from '../../../../Axios/fetches';
import testbanner from '../../../../assets/testbanner.jpg';
import ProfileInfo from "../../profile components/profileinfo";
import {BannerIMG} from "../../profile components/banner/styled";
import Post from "../../../posts/postcontainer";

const LikesProfilePage = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userData);
    const likes = useSelector(state => state.likedPosts)
    useEffect(() => {
        dispatch(fetchUserdata);
    }, [dispatch]);

    return (
        <MainContainer>
            <BannerIMG src={userInfo.banner ? userInfo.banner : testbanner} alt="banner" />
            <ProfileInfo/>
            <div className="my-posts">
                <Masonry breakpointCols={2} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
                    {likes.length > 0 ? likes.map((post, index) => (
                        <Post key={post.id} post={post}/>
                    )) : null}
                </Masonry>
            </div>
        </MainContainer>
    );
};

export default LikesProfilePage;
