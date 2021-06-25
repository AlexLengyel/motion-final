import styled from 'styled-components';

export const MainContainer = styled.div`
    height: auto;
    background: ${props => props.theme.profileBackground};
    > * {
        font-weight: ${props => props.theme.mediumWeight};
    }

    #smallSize{
        font-size: ${props => props.theme.small};
    }
    
    .about-me {
        position: relative;
        top: 50px;
        margin: 0 auto;
        text-align: center;
        width: 1152px;
        height: 400px;
        background: white;
        display: flex;
        margin-bottom: 80px;
        border-radius: 4px;
        box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2), 0px 10px 20px rgba(0, 0, 0, 0.05);
        
        

        .about-left {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            width: 27.7%;
            border-right: 2px solid ${props => props.theme.lightGray};

            img {
                width: 80px;
                height: 80px;
                border-radius: 45px;
                margin-top: 82px;
                object-fit: cover;
            }

            button {
                width: 158px;
                height: 40px;
                border-radius: 30px;
                background: none;
                border: 1px solid ${props => props.theme.lightGray};
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: ${props => props.theme.smaller};
                font-weight: ${props => props.theme.mediumWeight};
                margin-top: 40px;

            }
            
            .name {
                margin-top: 17px;
                font-weight: ${props => props.theme.mediumWeight};
                font-size: ${props => props.theme.profileMedium};
            }
            .subtext {
                margin-top: 8px;
                font-size: ${props => props.theme.small}
            }
        }

        .about-right {
            display: flex;
            width: 72.3%;
            flex-direction: column;


            .hobbies {
                height: 66.2%;
                display: flex;
                align-items: flex-start;

                .right-side, .left-side{
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: center;
                    margin-top: 40px;
                }
                .left-side{
                    margin-left: 60px;
                    width: 54.3%;
                    p{
                        height: 78px;
                        width: 320px;
                        position: relative;
                        overflow: hidden;
                        text-align: left;

                    }
                    p:after {
                        content: "";
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        width: 30%;
                        height: 1.2em;
                        background: linear-gradient(to right, rgba(255, 255, 255, 0), white 100%);
                        pointer-events: none;
                    }
                    .container{
                        display: flex;
                        
                        #left{
                            width: 250px;
                        }
                        #right{
                            margin-left: 10px;
                        }
                    }
                    .subContainer{
                        overflow: hidden;
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        
                        
                    }

                }
                .right-side{
                    width: 38.5%;
                    #hobbiesDiv {
                        display: flex;
                        flex-flow: row wrap;
                        margin-top: 22px;
                        height: 76px;
                        width: 100%;
                        overflow: hidden;
                    }
                    #hobby {
                        background-color: ${props => props.theme.profileBackground};
                        padding: 9px 17px 7px 16px;
                        border-radius: 18px;
                        width: fit-content;
                        height: fit-content;
                        margin: 0px 4px 12px 4px;
                        font-size: ${props => props.theme.small};
                        font-weight: ${props => props.theme.mediumWeight};
                    }
                }
            }

            .counters {
                display: flex;
                border-top: 1px solid ${props => props.theme.lightGray};
                height: 33.8%;
                button{
                    width: 80px;
                    height: 100%;
                    font-weight: ${props => props.theme.mediumWeight};
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: flex-start;
                    margin-left: 60px;
                    margin-right: 18px;
                    background-color: ${props => props.theme.white};
                    border: none;
                    #amount{
                        font-weight: ${props => props.theme.mediumWeight};
                        font-size: ${props => props.theme.profileMedium};
                    }
                    #text{
                        font-weight: ${props => props.theme.mediumWeight};
                        margin-top: 7px;

                    }
                }
            }

            .counters > div {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
            } 
        }  
    }
}

    .my-posts {
        display: flex;
        justify-content: center;
        .my-masonry-grid{
        display: -webkit-box; 
        display: -ms-flexbox; 
        display: flex;
        margin-left: -30px; 
        width: auto;
    }

    .my-masonry-grid_column{
        padding-left: 30px; 
        background-clip: padding-box;
    }   

    .my-masonry-grid_column > div { 
        background: ${props => props.theme.white};
        margin-bottom: 30px; 
        width: 560px;
    }
`;
