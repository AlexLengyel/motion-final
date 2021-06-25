import {
    AddHobbies,
    AvatarWrapper, DeleteIcon,
    EditContainer, EditInfo, EditInfoLabel, Hobbies, HobbyInput, HobbySection, HobbyTitle, InputFields,
    LeftContainer, LeftInformation,
    ProfileButtons, RightContainer, RightInformation,
    SaveDelete, SaveDeleteButton, ThingsLiked,
    UpdateAvatarButton,
} from './styled';
import {useEffect, useRef, useState} from 'react';
import Axios from '../../../../Axios';
import { useHistory } from "react-router-dom";
import AvatarPopUp from "../avatar_popup";
import CrossIcon from "../../../../assets/cross_icon.svg"
import {useDispatch, useSelector} from "react-redux";
import {fetchUserdata} from "../../../../Axios/fetches";
import * as f from '../../../../store/actionCreators'

const EditProfile = (props) => {
    const history = useHistory();
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.userData);
    // useRefs and local state
    const [editAvatar, setEditavatar] = useState(false);
    const avatarRef = useRef();
    // const bannerRef = useRef();
    const [newHobby, setNewHobby] = useState('');
    const [userEdits, setUseredits] = useState(userInfo);

    useEffect(() => {
        dispatch(fetchUserdata);
    }, [dispatch]);

    // used in several fetch requests
    const url = 'users/me/';
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };


    //object controlling user edits in useState
    const details = {
        firstname: userInfo['first_name'],
        lastname: userInfo['last_name'],
        email: userInfo.email,
        username: userInfo.username,
        location: userInfo.location,
        job: userInfo.job,
        about: userInfo['about'],
        hobbies: userInfo.hobbies,
    };

    // sends a PATCH request to update user details and avatar/banner
    const UpdateDetails = async () => {
        const body = {
            email: userEdits.email,
            first_name: userEdits.firstname,
            last_name: userEdits.lastname,
            username: userEdits.username,
            job: userEdits.job,
            location: userEdits.location,
            about: userEdits.about,
            hobbies: userEdits.hobbies
        };

        const response = await Axios.patch(url, body, config);

        if (avatarRef.current.value) {
            let newForm = new FormData();
            newForm.append('avatar', avatarRef.current.files[0]);
            const responseTwo = await Axios.patch(url, newForm, config);
            console.log(responseTwo);
        }

    setEditavatar(false);
    history.push("/profile");
    };

    const deleteHobby = async (hobby) => {
        // I've created a separate state for the onChange listener so that I can then append it to the hobbies list
        let hobbies = userInfo.hobbies.filter(i => i !== hobby);
        userEdits.hobbies = hobbies;
        console.log(hobbies);
        const body = {
            hobbies: hobbies,
        };
        const response = await Axios.patch(url, body, config);
        dispatch(f.userData(response.data));
    };

    const addHobby = async () => {
        // I've created a separate state for the onChange listener so that I can then append it to the hobbies list
        let hobbies = [...userInfo.hobbies, newHobby];
        userEdits.hobbies = hobbies;
        const body = {
            hobbies: hobbies,
        };
        const response = await Axios.patch(url, body, config);
        dispatch(f.userData(response.data));
    };

    return (
        <EditContainer>
            <LeftContainer>
                <AvatarWrapper src={userInfo.avatar} alt="avatar"/>
                <ProfileButtons>
                    <UpdateAvatarButton onClick={() => setEditavatar(!editAvatar)}>
                        UPDATE IMAGE
                    </UpdateAvatarButton>
                        <AvatarPopUp editAvatar={editAvatar} avatarRef={avatarRef} />
                    <SaveDelete>
                        <SaveDeleteButton>DELETE ACCOUNT</SaveDeleteButton>
                        <SaveDeleteButton onClick={UpdateDetails}>SAVE</SaveDeleteButton>
                    </SaveDelete>
                </ProfileButtons>
            </LeftContainer>
            <RightContainer>
                <InputFields>
                    <LeftInformation>
                        <EditInfoLabel>First Name</EditInfoLabel>
                        <EditInfo type="text" placeholder={details.firstname} onChange={e => setUseredits({ ...userEdits, firstname: e.target.value })} />
                        <EditInfoLabel>Email</EditInfoLabel>
                        <EditInfo type="text" placeholder={details.email} onChange={e => setUseredits({ ...userEdits, email: e.target.value })} />
                        <EditInfoLabel>Location</EditInfoLabel>
                        <EditInfo type="text" placeholder={details.location} onChange={e => setUseredits({ ...userEdits, location: e.target.value })} />
                        <EditInfoLabel>About</EditInfoLabel>
                        <EditInfo type="text" placeholder={details.about} onChange={e => setUseredits({ ...userEdits, about: e.target.value })} />
                    </LeftInformation>
                    <RightInformation>
                        <EditInfoLabel>Last Name</EditInfoLabel>
                        <EditInfo type="text" placeholder={details.lastname} onChange={e => setUseredits({ ...userEdits, lastname: e.target.value })} />
                        <EditInfoLabel>Username</EditInfoLabel>
                        <EditInfo type="text" placeholder={details.username} onChange={e => setUseredits({ ...userEdits, username: e.target.value })} />
                        <EditInfoLabel>Job</EditInfoLabel>
                        <EditInfo type="text" placeholder={details.job} onChange={e => setUseredits({ ...userEdits, job: e.target.value })} />
                        <EditInfoLabel>Password</EditInfoLabel>
                        <EditInfo type="text" />
                    </RightInformation>
                </InputFields>
                <HobbySection>
                    <HobbyTitle>Hobbies</HobbyTitle>
                    <Hobbies>
                        {details.hobbies ? details.hobbies.map((hobby, index) => (
                            <ThingsLiked key={hobby}>
                                {hobby}
                                <DeleteIcon src={CrossIcon} onClick={() => deleteHobby(hobby)}/>
                            </ThingsLiked>
                        )) : null}
                    </Hobbies>
                    <HobbyInput>
                        <AddHobbies type="text" placeholder="Type something..." onChange={e => setNewHobby(e.target.value)} />
                        <SaveDeleteButton onClick={addHobby}>
                            ADD
                        </SaveDeleteButton>
                    </HobbyInput>
                </HobbySection>
            </RightContainer>
        </EditContainer>
    );
};

export default EditProfile;
