const ADD_TOKEN = 'ADD_TOKEN';
const NEW_POST = 'NEW_POST';
const USER_DATA = 'USER_DATA';
const USER_POSTS = 'USER_POSTS';
const POSTS_LIST = 'POSTS_LIST';
const GET_USERS = 'GET_USERS';
const FRIEND_REQUESTS = 'GET_FRIEND_REQUESTS';
const SEARCH_RESULTS = 'SEARCH_RESULTS';
const LIKED_POSTS = 'LIKED_POSTS'
const FRIEND_POSTS = 'FRIEND_POSTS'
const FOLLOW_POSTS = 'FOLLOW_POSTS'
const ALL_COMMENTS = 'ALL_COMMENTS'
const NEW_COMMENT = 'NEW_COMMENT'

export const addToken = (data) => {
    return {
        type: ADD_TOKEN,
        payload: data
    }
}

export const newPost = (data) => {
    return {
        type: NEW_POST,
        payload: data
    }
}

export const userData = (data) => {
    return {
        type: USER_DATA,
        payload: data
    }
}

export const userPosts = (data) => {
    return {
        type: USER_POSTS,
        payload: data
    }
}

export const postList = (data) => {
    return {
        type: POSTS_LIST,
        payload: data
    }
}

export const getUsers = (data) => {
    return {
        type: GET_USERS,
        payload: data
    }
}

export const friendReqs = (data) => {
    return {
        type: FRIEND_REQUESTS,
        payload: data
    }
}

export const search = (data) => {
    return {
        type: SEARCH_RESULTS,
        payload: data
    }
}

export const liked = (data) => {
    return {
        type: LIKED_POSTS,
        payload: data
    }
}

export const friendPosts = (data) => {
    return {
        type: FRIEND_POSTS,
        payload: data
    }
}
  

export const followed = (data) => {
    return {
        type: FOLLOW_POSTS,
        payload: data
    }
}

export const AllComments = (data) => {
    return {
        type: ALL_COMMENTS,
        payload: data
    }
}

export const newComment = (data) => {
    return {
        type: NEW_COMMENT,
        payload: data
    }
}
          
