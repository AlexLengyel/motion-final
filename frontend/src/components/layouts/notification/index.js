import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import {useDispatch, useSelector} from "react-redux";

import Avatar from '../../../styles/Avatar';
import AcceptIcon from '../../../assets/navigationbar/accept_icon.svg';
import RejectIcon from '../../../assets/navigationbar/reject_icon.svg';
import Axios from "../../../Axios";

// import PendingIcon from '../../../assets/navigationbar/pending_icon.svg';
// <Icon marginLeft={"auto"} marginTop={"3.5px"} height={"23px"} cursor={"auto"} transform={"none"} src={PendingIcon} alt='pending icon'/>


const Container = styled.div`
    background-color: white;
    width: 280px;
    box-shadow: -2px 0px 24px 4px rgba(0,0,0,0.12);

    position: absolute;
    top: 80px;
    right: 15%;

    padding: 15px 15px 0px 15px;

    display: flex;
    flex-direction: column;
    align-items: center;
`


const FriendRequests = styled.p`
    width: 100%;
    height: 20px;
    font-size: ${props => props.theme.small};
    font-weight: bold;
    line-height: 20px;
    
    margin-bottom: 15px;
`


const UserContainer = styled.div`
    width: 100%;
    height: 30px;
    
    margin-bottom: 15px;
    
    display: flex;
`


const RequesterName = styled.p`
    height: 100%;
    font-size: ${props => props.theme.small};
    line-height: 30px;
    
    :hover {
        cursor: pointer;
    }
`


const Icon = styled.img`
    height: ${props => props.height || "20px"};
    width: auto;
    
    margin-top: ${props => props.marginTop || "5px"};
    margin-left: ${props => props.marginLeft || "4%"};
    margin-right: ${props => props.marginRight || "4%"};

    :hover {
        cursor: ${props => props.cursor || "pointer"};
    }

    :active {
        transform: ${props => props.transform || "translateY(2px)"};
    }
`


const NotificationDropdown = (props) => {
    const friendRequests = useSelector(state => state.friendsRequests);
    const myProfileData = useSelector(state => state.userData);

    const [outgoingRequests, setOutgoingRequests] = useState(friendRequests.filter(request => request.requester.id === myProfileData.id));
    const [incomingRequests, setIncomingRequests] = useState(friendRequests.filter(request => request.requester.id !== myProfileData.id));

    useEffect(() => {
        setOutgoingRequests(friendRequests.filter(request => request.requester.id === myProfileData.id));
        setIncomingRequests(friendRequests.filter(request => request.requester.id !== myProfileData.id));
    }, [friendRequests, setOutgoingRequests, setIncomingRequests, myProfileData.id]);

    const dispatch = useDispatch();

    const submitRequest = async (id, letter) => {
        const url = `social/friends/requests/${id}/`;

        const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        };

        if (letter !== "D") {
            const body = {
                status: letter
            }
            try {
                await Axios.patch(url, body, config);
            } catch (e) {
                console.log(e);
            }
        } else {
            try {
                await Axios.delete(url, config);
            } catch (e) {
                console.log(e);
            }
        }

        const action = {
            type: 'REMOVE_FRIEND_REQUEST',
            payload: {
                id: id
            }
        };
        dispatch(action);
    };

    return (
        <Container>
            <FriendRequests>Incoming friend requests:</FriendRequests>
            {
                incomingRequests.map(request => {
                    const { avatar, username } = request.requester;
                    return <UserContainer key={request.id}>
                        <Avatar user={avatar} height={"30px"} width={"30px"}/>
                        <RequesterName>{username}</RequesterName>
                        <Icon marginLeft={"auto"} src={AcceptIcon} alt='accept icon' onClick={() => submitRequest(request.id, "A")}/>
                        <Icon marginLeft={"0px"} src={RejectIcon} alt='reject icon' onClick={() => submitRequest(request.id, "R")}/>
                    </UserContainer>
                })
            }
            <FriendRequests>Outgoing friend requests:</FriendRequests>
            {
                outgoingRequests.map(request => {
                    const { avatar, username } = request.receiver;
                    return <UserContainer key={request.id}>
                        <Avatar user={avatar} height={"30px"} width={"30px"}/>
                        <RequesterName>{username}</RequesterName>
                        <Icon marginLeft={"auto"} src={RejectIcon} alt='reject icon' onClick={() => submitRequest(request.id, "D")}/>
                    </UserContainer>
                })
            }
        </Container>
    )
}

export default NotificationDropdown;