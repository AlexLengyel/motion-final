import Axios from '../index';
import * as f from '../../store/actionCreators' // f stands for function - this is simple than importing every single function separately

export const fetchPosts = async dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };
    const url = 'social/posts/?limit=25&offset=0';
    const response = await Axios.get(url, config);
    dispatch(f.postList(response.data.results));
};

export const fetchUserProfileData = async dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };
    // fetch user's data
    const url = 'users/me/';
    const response = await Axios.get(url, config);
    dispatch(f.userData(response.data));
};

// fetch user information as well as user posts
export const fetchUserdata = async dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };
    const url = 'users/me/';
    const response = await Axios.get(url, config);
    dispatch(f.userData(response.data));

    //fetch user posts
    const urlTwo = `social/posts/user/${response.data.id}/?limit=25&offset=0`;
    const responseTwo = await Axios.get(urlTwo, config);
    dispatch(f.userPosts(responseTwo.data.results));
};

// fetch posts that are liked by the logged in user
export const fetchLikedPosts = async dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };
    const url = 'social/posts/likes/';
    try {
        const response = await Axios.get(url, config);
        dispatch(f.liked(response.data));
    } catch (e) {
        console.log(e);
    }
};

export const getFriendsRequests = async dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };
    const url = 'social/friends/requests/';
    const response = await Axios.get(url, config);
    dispatch(f.friendReqs(response.data));
};

export const getUsers = async dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };
    const url = 'users/?limit=100';
    const response = await Axios.get(url, config);
    dispatch(f.getUsers(response.data.results));
};

// fetch friends posts
export const fetchFriendPosts = async dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };
    const url = 'social/posts/friends/';
    try {
        const response = await Axios.get(url, config);
        console.log(response)
        dispatch(f.friendPosts(response.data));
    } catch (e) {
        console.log(e);
    }
};

// fetch followed friends' posts
export const fetchFollowed = async dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };
    const url = 'social/posts/following/';
    try {
        const response = await Axios.get(url, config);
        dispatch(f.followed(response.data));
    } catch (e) {
        console.log(e);
    }
};
