/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from './styled';
import { useDispatch, useSelector } from 'react-redux';
import Axios from '../../Axios';
import { useEffect } from 'react';
import { getFriendsRequests, getUsers } from '../../Axios/fetches';
import Masonry from 'react-masonry-css';
import UserCard from "./friend_card";

export const FindFriends = () => {
    const userList = useSelector(state => state.userList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers);
    }, []);

    return (
        <div style={{"background":"#F2F2F2"}}>
            <Container>
                 <Masonry breakpointCols={3} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
                     {userList.map(user => <UserCard user={user}/>)}
                </Masonry>
            </Container>
        </div>
    );
};
