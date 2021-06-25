import styled from 'styled-components';

export const NakedButton = styled.button`
    background: none;
    border: none;
    font-size: ${props => props.fontSize || props.theme.medium};
    color: ${props => props.fontColor || "black"};
    margin-right: ${props => props.marginRight || "0px"};
    margin-left: ${props => props.marginLeft || "0px"};
    
    :hover {
        cursor: pointer;
    }
`