/* eslint-disable no-unused-vars */
import Posts from '../components/posts';
import UserProfilePage from '../components/profile/pages/profile page';
import NavBar from '../components/navbar/';
import { Switch, Route } from 'react-router-dom';
import { FindFriends } from '../components/findfriends';
import { LikedPosts } from '../components/posts/likedposts'
import { FriendPosts } from '../components/posts/friendposts'
import { FollowedPosts } from '../components/posts/Followedposts'
import SearchResults from '../components/posts/searchResults';
import EditProfilePage from "../components/profile/pages/edit profile page";
import LikesProfilePage from "../components/profile/pages/Likes_profile";
import FriendsProfile from "../components/profile/pages/friends_profile/index";
import FollowersProfile from "../components/profile/pages/followers_profile";
import FollowingProfile from "../components/profile/pages/following_profile";

import {TopContainer} from "../components/homepage/login/styled";

import styled from 'styled-components';

const SpaceHolderForNavbar = styled.div`
    height: 65px;
`

const UserApp = () => {
    return (
        <>
            <NavBar />
            <SpaceHolderForNavbar />
            <Switch>
                <Route exact path="/" component={Posts} />
                <Route exact path="/profile" component={UserProfilePage} />
                <Route exact path="/profile/likes" component={LikesProfilePage} />
                <Route exact path="/profile/friends" component={FriendsProfile} />
                <Route exact path="/profile/followers" component={FollowersProfile} />
                <Route exact path="/profile/following" component={FollowingProfile} />
                <Route exact path="/editprofile" component={EditProfilePage} />
                <Route exact path="/findfriends" component={FindFriends} />
                <Route exact path='/search-results' component={ SearchResults } />
                <Route exact path={'/liked-posts'} component={ LikedPosts } />
                <Route exact path={'/friends-posts'} component={ FriendPosts } />
                <Route exact path={'/followed-posts'} component={ FollowedPosts } />
            </Switch>
        </>
    );
};

export default UserApp;
