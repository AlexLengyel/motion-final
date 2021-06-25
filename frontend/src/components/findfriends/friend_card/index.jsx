import {BaseButton, Card, FollowButton, FriendButton} from "./styled";
import { useState } from "react";
import Axios from "../../../Axios";


const UserCard = props => {
    const defaultAvatar = 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png';
    const { id, avatar, first_name, last_name, location, about, hobbies,
    logged_in_user_is_following, logged_in_user_is_friends, logged_in_user_received_fr} = props.user

    const [follow, setFollow] = useState(logged_in_user_is_following)
    const [friend, setFriend] = useState(logged_in_user_is_friends)
    const [pendingRequest, setPending] = useState(logged_in_user_received_fr)

    const FollowUnfollow = async() => {
        const url = `social/followers/toggle-follow/${id}/`;
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        };
        const response = Axios.patch(url, null, config)
        setFollow(!follow)
    }

    const FriendUnfriend = async() => {
        const url = `/social/friends/request/${id}/`;
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        };
        const response = Axios.post(url, null, config)
    }

    return(
        <Card>
            <div className="upper">
                <img src={avatar ? avatar : defaultAvatar} alt="pp"/>
                <p className="name">{first_name} {last_name}</p>
                <p className="location">{location}</p>
            </div>

            <div className="middle">
                <FollowButton status={follow} onClick={FollowUnfollow}>
                    {follow ? 'FOLLOWING' : 'FOLLOW' }
                </FollowButton>
                {
                    friend ?
                    <FriendButton status={friend} onClick={() => {FriendUnfriend(); setFriend(!friend)}}>
                        FRIEND
                    </FriendButton> :
                    <FriendButton status={friend} onClick={() => {FriendUnfriend(); setPending(!pendingRequest)}}>
                        {pendingRequest ? 'PENDING APPROVAL' : 'ADD FRIEND' }
                    </FriendButton>
                }
            </div>

            <div className="lower">
                <p>{about}</p>
                <div className="hobbies">
                {hobbies ? hobbies.map(hobby => <span className="hobby">{hobby}</span>) : null}
                </div>
            </div>
        </Card>
    )
}

export default UserCard