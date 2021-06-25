import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        font-size: 16px;
        font-weight: 500;
        font-family: 'Roboto', sans-serif;
        box-sizing: border-box;
    }

    button {
        :hover{
            cursor: pointer;
        }
    }
    
    body {
        background-color: #F2F2F2;
    }
`;

export const defaultTheme = {
    //colors
    purple: '#800080',
    linearGradient: 'linear-gradient(111deg, #b64cf8 0%, #3365fa)',
    white: '#FFFFFF',
    black: '#000000',
    whiteTransparent: 'rgba(255, 255, 255, 0.6)',
    lightGray: '#dedede',
    backgroundLightGrey: '#F2F2F2',
    profileBackground: '#F2F2F2',
    darkGray: '#a9a9a9',
    boxShadow: '0 0 1px rgba(0, 0, 0, 0.2), 0 10px 20px rgba(0, 0, 0, 0.05)',
    //font

    larger: '40px',
    large: '30px',
    medium: '16px',
    small: '14px',
    smaller: '12px',
    smallest: '10px',

    postsMedium: '22px',
    profileMedium: '24px',

    //fontweight
    largeWeight: '500',
    mediumWeight: '400',
};
