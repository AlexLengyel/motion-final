import styled from 'styled-components';
import React from "react";
import { useHistory, useLocation } from "react-router-dom";

import ProfileIcon from '../../../assets/navigationbar/profile_icon.svg';
import LogoutIcon from '../../../assets/navigationbar/logout_icon.svg';


const Container = styled.div`
    background-color: white;
    width: 100px;
    box-shadow: -2px 0px 24px 4px rgba(0,0,0,0.12);

    position: absolute;
    top: 80px;
    right: 4%;

    padding: 15px 15px 0px 15px;

    display: flex;
    flex-direction: column;
    align-items: center;
`


const OptionContainer = styled.div`
    width: 100%;
    height: 25px;
    
    margin-bottom: 15px;
    
    display: flex;
    justify-content: space-between;
    
    :hover {
        cursor: pointer;
    }
`


const OptionName = styled.p`
    height: 100%;
    font-size: ${props => props.theme.small};
    line-height: 25px;
`


const Icon = styled.img`
    height: ${props => props.height || "20px"};
    width: auto;
    
    margin-top: ${props => props.marginTop || "2.5px"}; 
`


const MenuDropdown = (props) => {
    const history = useHistory();
    const location = useLocation();

    const logMeOut = () => {
        localStorage.clear('token');
        history.push('/auth/login');
    }

    return (
        <Container>
            <OptionContainer onClick={() => location.pathname !== "/profile" ? history.push("/profile") : null}>
                <Icon src={ProfileIcon} alt='profile icon' />
                <OptionName>Profile</OptionName>
            </OptionContainer>
            <OptionContainer onClick={logMeOut}>
                <Icon src={LogoutIcon} alt='logout icon' />
                <OptionName>Logout</OptionName>
            </OptionContainer>
        </Container>
    )
}

export default MenuDropdown;