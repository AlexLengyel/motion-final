import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchUserdata} from "../../../../Axios/fetches";
import { useHistory } from "react-router-dom";
import {EditProfileButton} from "./styled";


const ProfileInfo = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userData);
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchUserdata);
    }, [dispatch]);

    return (
        <div className="overlap">
            <div className="about-me">
                <div className="about-left">
                    <img src={userInfo.avatar} alt="profile" />
                    <span className="name">{`${userInfo['first_name']} ${userInfo['last_name']}`}</span>
                    <span className="subtext" id="smallSize">
                        {userInfo.location}
                    </span>
                    <EditProfileButton onClick={() => history.push("/editprofile")}>EDIT PROFILE</EditProfileButton>
                </div>
                <div className="about-right">
                    <div className="hobbies">
                        <div className="left-side">
                            <span id="smallSize">About</span>
                            <p className="user-info">{userInfo['about']}</p>
                            <div className="container">
                                <div className="subContainer" id="left">
                                    <span id="smallSize">Email</span>
                                    <span>{userInfo.email}</span>
                                </div>
                                <div className="subContainer" id="right">
                                    <span id="smallSize">Job</span>
                                    <span>{userInfo.job}</span>
                                </div>
                            </div>
                        </div>
                        <div className="right-side">
                            <span id="smallSize">Things I like</span>
                            <div id="hobbiesDiv" className="thingsIlike">
                                {userInfo['hobbies'] ? userInfo['hobbies'].map((hobby, index) => <span key={hobby} id="hobby">{hobby}</span>) : null}
                            </div>
                        </div>
                    </div>
                    <div className="counters">
                        <div>
                            <button onClick={() => history.push("/profile")}>
                                <span id="amount">{userInfo['amount_of_posts']}</span>
                                <span id="text">Posts</span>
                            </button>
                        </div>
                        <div>
                            <button onClick={() => history.push("/profile/likes")}>
                                <span id="amount">{userInfo['amount_of_likes']}</span>
                                <span id="text">Likes</span>
                            </button>
                        </div>
                        <div>
                            <button onClick={() => history.push("/profile/friends")}>
                                <span id="amount">{userInfo['amount_of_friends']}</span>
                                <span id="text">Friends</span>
                            </button>
                        </div>
                        <div>
                            <button onClick={() => history.push("/profile/followers")}>
                                <span id="amount">{userInfo['amount_of_followers']}</span>
                                <span id="text">Followers</span>
                            </button>
                        </div>
                        <div>
                            <button onClick={() => history.push("/profile/following")}>
                                <span id="amount">{userInfo['amount_of_following']}</span>
                                <span id="text">Following</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProfileInfo;