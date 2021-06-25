/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
const initialState = {
    token: null,
    posts: [],
    userData: [],
    userPosts: [],
    userList: [],
    friendsRequests: [],
    searchResult: [],
    likedPosts: [],
    friendPosts: [],
    followedPosts: [],
    postComments: []
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TOKEN':
            return { ...state, token: action.payload };
        case 'NEW_POST':
            return { ...state, posts: [action.payload, ...state.posts] };
        case 'POSTS_LIST':
            return { ...state, posts: action.payload };
        case 'USER_DATA':
            return { ...state, userData: action.payload };
        case 'USER_POSTS':
            return { ...state, userPosts: action.payload };
        case 'GET_USERS':
            return { ...state, userList: action.payload };
        case 'GET_FRIEND_REQUESTS':
            return { ...state, friendsRequests: action.payload };
        case 'REMOVE_FRIEND_REQUEST':
            return { ...state, friendsRequests: state.friendsRequests.filter(request => request.id !== action.payload.id)}
        case 'SEARCH_RESULTS':
            return { ...state, searchResult: action.payload };
        case 'LIKED_POSTS':
            if (action.task){
                return {...state, likedPosts: state.likedPosts.filter(post => post.id !== action.payload)}
            } else {
                return { ...state, likedPosts: action.payload };
            }          
        case 'FRIEND_POSTS':
            return { ...state, friendPosts: action.payload};
        case 'FOLLOW_POSTS':
            return { ...state, followedPosts: action.payload};
        case 'ALL_COMMENTS':
            return { ...state, postComments: action.payload};
        case 'NEW_COMMENT':
            return { ...state, postComments: [...state.postComments, action.payload]};
        default:
            return state;
    }
};
