import styled from 'styled-components';
import backgroundimage from '../../../assets/main/background_image.png';

export const LeftContainer = styled.div`
    width: 40%;
    height: 100%;
    background-image: url('${backgroundimage}'), ${props => props.theme.linearGradient};
    background-repeat: no-repeat;
    background-size: cover;
`;

export const Top = styled.div`
    height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    img {
        width: 80px;
        height: 80px;
        object-fit: none;
        object-position: 50% 0%;
    }
    h1 {
        margin-top: 15px;
        color: ${props => props.theme.white};
        font-size: ${props => props.theme.large};
        font-weight: ${props => props.theme.largeWeight};
    }
    p {
        color: ${props => props.theme.whiteTransparent};
        margin-top: 4%;
        width: 40%;
        display: table-cell;
        vertical-align: middle;
        text-align: center;
    }
`;

export const Middle = styled.div`
    height: 20%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    button {
        background: none;
        border: 2px solid ${props => props.theme.whiteTransparent};
        width: 126px;
        height: 40px;
        border-radius: 100px;
        margin-left: 8px;
        margin-right: 8px;
        margin-top: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #gstore {
        padding-top: 4px;
    }
`;

export const Bottom = styled.div`
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    div {
        background: none;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    button {
        background: none;
        border: none;
        height: 40px;
        width: 40px;
        border-radius: 100%;
        margin-left: 8px;
        margin-right: 8px;
        display: flex;
        opacity: 50%;
    }
    img {
        color: ${props => props.theme.whiteTransparent};
    }
    p {
        color: ${props => props.theme.white};
        margin-bottom: 5%;
        margin-top: 4%;
    }
`;
