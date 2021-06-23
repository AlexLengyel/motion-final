import React from 'react'
import avatar from '../../assets/navigationbar/default_avatar.png'
import styled from 'styled-components';
import { useHistory, useLocation } from "react-router-dom";


export const BaseAvatar = styled.img`
    height: ${props => props.height || "42px"};
    width: ${props => props.width || "42px"};
    object-fit: cover;
    border-radius: 50%;
    margin-left: 4%;
    margin-right: 4%;

    :hover {
        cursor: pointer;
    }

    :active {
        transform: translateY(2px);
    }
`


const Avatar = (props) => {
    const history = useHistory();
    const location = useLocation();
    return (
        <BaseAvatar height={props.height} width={props.width} src={props.user ? props.user : avatar} alt={props.alt} onClick={() => location.pathname !== "/Profile" ? history.push("/Profile3") : null}/>

    )
}

export default Avatar;