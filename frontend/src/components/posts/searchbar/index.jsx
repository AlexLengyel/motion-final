import Axios from '../../../Axios'
import React, { useState } from 'react'
import { useDispatch} from 'react-redux'
import { useHistory, useLocation, withRouter } from 'react-router-dom'
import styled from "styled-components";
import { NakedButton } from "../../../styles/Button";
import SearchIcon from "../../../assets/posts/search.svg";

const Container = styled.div`
    width: 100%;
    height: 65px;
    background-color: ${props => props.theme.profileBackground};
    border-bottom: 1.5px rgba(226, 223, 223, 0.619) solid;

    padding: 0 15%;
    margin-bottom: 30px;

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
    outline: none;

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


const SearchBar = props => {
    const [searchText, setSearchtext] = useState('')
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    
    const FindPost = async (text) => {
        const url = `social/posts/?search=${text}`;
        const config = {
            headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
        };

        try {
            const response = await Axios.get(url, config);
            console.log(response);
            const action = {
                type: 'SEARCH_RESULTS',
                payload: response.data
            }
            dispatch(action)
            props.history.push('/search-results')
        } catch (e){
            console.log(e)
        }

    }

    return (
        <Container>
            <SubContainer>
                <SearchImg src={SearchIcon} alt='search icon'/>
                <SearchInput type='text' placeholder='Search posts...' onChange={(e) => setSearchtext(e.target.value)}
                onKeyDown={e => e.key === 'Enter' ? FindPost(searchText) : null} value={searchText} />
            </SubContainer>
                <SearchBarNakedButton marginLeft="auto"
                                      onClick={() => location.pathname !== "/liked-posts" ? history.push("/liked-posts") : null}
                                      fontWeight={location.pathname === "/liked-posts" ? "bold" : "normal"}>Liked</SearchBarNakedButton>
                <SearchBarNakedButton marginLeft="4%"
                                      onClick={() => location.pathname !== "/friends-posts" ? history.push("/friends-posts") : null}
                                      fontWeight={location.pathname === "/friends-posts" ? "bold" : "normal"}>Friends</SearchBarNakedButton>
                <SearchBarNakedButton marginLeft="4%"
                                      onClick={() => location.pathname !== "/followed-posts" ? history.push("/followed-posts") : null}
                                      fontWeight={location.pathname === "/followed-posts" ? "bold" : "normal"}>Followed</SearchBarNakedButton>
        </Container>
    )
}

export default withRouter(SearchBar)