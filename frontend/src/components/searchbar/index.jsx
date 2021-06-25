import React from 'react';
import styled from 'styled-components';

import { NakedButton } from '../../styles/Button';

import SearchIcon from '../../assets/posts/search.svg';
import { useLocation } from "react-router-dom";


const Container = styled.div`
    width: 100%;
    height: 80px;
    background-color: ${props => props.theme.backgroundLightGrey};
    border-bottom: 1.5px rgba(226, 223, 223, 0.619) solid;

    padding: 0 15%;

    display: flex;
    align-items: center;
    justify-content: center;
`


const SubContainer = styled.div`
    margin-right: ${props => props.marginRight || "4%"};
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
`


const SearchImg = styled.img`
    margin-right: 15px;
`


const SearchInput = styled.input`
    border: none;
    background: none;
    color: grey;
    width: 130px;

    :hover {
        outline: none;
        cursor: text;
    }
`


const SearchBarNakedButton = styled(NakedButton)`
    color: grey;
    height: 100%;
    
    font-weight: ${props => props.fontWeight || "normal"};
`


const SearchBar = () => {
    const location = useLocation();

    return (
        <Container>
            <SubContainer>
                <SearchImg src={SearchIcon} alt='Search Icon'/>
                <SearchInput type="text" placeholder="Search posts..."/>
            </SubContainer>
            <SearchBarNakedButton marginLeft="auto" fontWeight={location.pathname === "/liked-posts" ? "bold" : "normal"}>Liked</SearchBarNakedButton>
            <SearchBarNakedButton marginLeft="4%">Friends</SearchBarNakedButton>
            <SearchBarNakedButton marginLeft="4%">Follow</SearchBarNakedButton>
        </Container>
    )
}

export default SearchBar