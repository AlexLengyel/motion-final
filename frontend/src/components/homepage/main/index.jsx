import React from 'react';
import { LeftContainer, Top, Middle, Bottom } from './styled';
import logo from '../../../assets/main/logo.png';
import appStore from '../../../assets/main/app_store.svg';
import playStore from '../../../assets/main/play_store.svg';
import twitter from '../../../assets/main/twitter.svg';
import facebook from '../../../assets/main/facebook.svg';
import instagram from '../../../assets/main/instagram.svg';

export const Main = () => {
    return (
        <LeftContainer>
            <Top>
                <img src={logo} alt='logo' />
                <h1>Motion</h1>
                <p>Connect with your friends around the world with Motion</p>
            </Top>
            <Middle>
                <button>
                    <img src={appStore} alt="applestoreicon" />
                </button>
                <button>
                    <img src={playStore} id="gstore" alt="googlestoreicon" />
                </button>
            </Middle>
            <Bottom>
                <div>
                    <button>
                        <img src={twitter} alt="twittericon" />
                    </button>
                    <button>
                        <img src={facebook} alt="facebookicon" />
                    </button>
                    <button>
                        <img src={instagram} alt="instagramicon" />
                    </button>
                </div>
                <p>© Motion 2018. All rights reserved.</p>
            </Bottom>
        </LeftContainer>
    );
};
