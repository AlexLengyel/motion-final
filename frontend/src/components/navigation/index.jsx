/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import { Navbar, LeftContainer, RightContainer, UserModal, FriendsModal } from './styled';
import Logo from '../../assets/navigationbar/logo.svg';
import postsIcon from '../../assets/navigationbar/posts.svg';
import friendsIcon from '../../assets/navigationbar/friends.svg';
import notificationIcon from '../../assets/navigationbar/notificationbell.svg';
import menuIcon from '../../assets/navigationbar/dots.svg';
import notificationCircle from '../../assets/navigationbar/notification_circle.svg';
import profileIcon from '../../assets/navigationbar/profile_icon.svg';
import logoutIcon from '../../assets/navigationbar/logout_icon.svg';
import acceptIcon from '../../assets/navigationbar/accept_icon.svg';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from '../../Axios';
import { withRouter } from 'react-router-dom';
import { getFriendsRequests } from '../../Axios/fetches';
import useOnClickOutside from './hooks';


const Navigation = props => {
    const friendsRequests = useSelector(state => state.friendsRequests);
    const userData = useSelector(state => state.userData);

    // toggle menu button
    const ref = useRef();
    const [toggleUserModal, setToggleUserModal] = useState(false);
    const [toggleFriendsModal, setToggleFriendsModal] = useState(false);

    useOnClickOutside(ref, () => setToggleUserModal(false), 'toggleUserModal');
    useOnClickOutside(ref, () => setToggleFriendsModal(false), 'toggleFriendsModal');
    //

    const defaultAvatar = 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png';

    const token = localStorage.token;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFriendsRequests);
    }, []);

    const acceptFriendRequest = async friendRequest => {
        const url = `/social/friends/requests/${friendRequest.id}/`;
        const body = { status: 'A' };
        const headers = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const response = await Axios.patch(url, body, headers);
        dispatch(getFriendsRequests);
    };

    const deleteFriendRequest = async friendRequestId => {
        const url = `/social/friends/requests/${friendRequestId}/`;
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const response = await Axios.delete(url, config);

        dispatch(getFriendsRequests);
    };

    const logMeOut = () => {
        localStorage.clear('token');
        props.history.push('/auth/login')
    }

    return (
        <Navbar>
            <LeftContainer>
                <img src={Logo} />
                <h1>Motion</h1>
                <button onClick={() => props.history.push('/')}>
                    <img src={postsIcon} />
                    <p>Posts</p>
                </button>
                <button onClick={() => props.history.push('/findfriends')}>
                    <img src={friendsIcon} />
                    <p>Find Friends</p>
                </button>
            </LeftContainer>
            <RightContainer>
                <button className="toggleFriendsModal" ref={ref} id="notificationButton" onClick={() => setToggleFriendsModal(!toggleFriendsModal)}>
                    <img className="toggleFriendsModal" id="notificationBell" src={notificationIcon} />
                    {/*<div className="toggleFriendsModal" id="notificationCircle">*/}
                    {/*    <span className="toggleFriendsModal">{friendsRequests.length ? friendsRequests.length - 1 : 0}</span>*/}
                    {/*    <img className="toggleFriendsModal" src={notificationCircle} />*/}
                    {/*</div>*/}
                </button>
                <img src={userData.avatar} id="userAvatar" alt="avatar" />
                <button className="toggleUserModal" ref={ref} id="menuButton" onClick={() => setToggleUserModal(!toggleUserModal)}>
                    <img className="toggleUserModal" src={menuIcon} />
                </button>
                {toggleUserModal ? (
                    <UserModal ref={ref}>
                        <button
                            onClick={() => {
                                props.history.push('/profile');
                                setToggleUserModal(!toggleUserModal);
                            }}
                        >
                            <img src={profileIcon} />
                            <span>Profile</span>
                        </button>
                        <button onClick={logMeOut}>
                            <img src={logoutIcon} />
                            <span>Logout</span>
                        </button>
                    </UserModal>
                ) : null}
                {toggleFriendsModal ? (
                    <FriendsModal ref={ref}>
                        <div id="friendsModalContent">
                            <span id="reqTitle">Received requests</span>

                            {friendsRequests
                                ? friendsRequests.map((request, index) =>
                                      request.requester.logged_in_user_received_fr ? (
                                          <div id="receivedFriendReq" index={index} key={request.requester.id}>
                                              <img id="profileIcon" src={request.requester.avatar ? request.requester.avatar : defaultAvatar} />
                                              <div id="description">
                                                  <span>
                                                      {request.requester.first_name ? request.requester.first_name : 'Motion'} {request.requester.last_name ? request.requester.last_name : 'User'}
                                                  </span>
                                                  <span>{request.requester.location}</span>
                                              </div>
                                              <div id="buttonDiv">
                                                  <button id="acceptButton" onClick={() => acceptFriendRequest(request)}>
                                                      <img src={acceptIcon} />
                                                  </button>
                                                  <button id="rejectButton" onClick={() => deleteFriendRequest(request.id)}>
                                                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                          <path fill-rule="evenodd" clip-rule="evenodd" d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="black" id="darkGaryColor" />
                                                      </svg>
                                                  </button>
                                              </div>
                                          </div>
                                      ) : null
                                  )
                                : null}

                            <span id="reqTitle">Sent requests</span>
                            {friendsRequests
                                ? friendsRequests.map((request, index) =>
                                      request.receiver.logged_in_user_sent_fr ? (
                                          <div id="sentFriendReq" index={index} key={request.receiver.id}>
                                              <img id="profileIcon" src={request.receiver.avatar ? request.receiver.avatar : defaultAvatar} />
                                              <div id="description">
                                                  <span>
                                                      {request.receiver.first_name ? request.receiver.first_name : 'Unknown'} {request.receiver.last_name ? request.receiver.last_name : 'User'}
                                                  </span>
                                                  <span>{request.receiver.location}</span>
                                              </div>
                                              <div id="buttonDiv">
                                                  <button id="rejectButton" onClick={() => deleteFriendRequest(request.id)}>
                                                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.99 0C4.47 0 0 4.48 0 10C0 15.52 4.47 20 9.99 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 9.99 0ZM10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2C14.42 2 18 5.58 18 10C18 14.42 14.42 18 10 18ZM9 5H10.5V10.25L15 12.92L14.25 14.15L9 11V5Z" fill="black" id="darkGaryColor" />
                                                      </svg>
                                                  </button>
                                              </div>
                                          </div>
                                      ) : null
                                  )
                                : null}
                        </div>
                    </FriendsModal>
                ) : null}
            </RightContainer>
        </Navbar>
    );
};

export default withRouter(Navigation);
