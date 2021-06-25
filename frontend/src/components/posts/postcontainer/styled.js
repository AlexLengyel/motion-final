import styled from 'styled-components';

export const PostWrapper = styled.div`
    width: 560px;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-shadow: ${props => props.theme.boxShadow};
    border-radius: 4px;
    z-index: 0;

    .small-font {
        font-size: ${props => props.theme.small};
        mix-blend-mode: normal;
        color: gray;
    }

    .post-upper {
        display: flex;
        justify-content: space-between;
        margin-bottom: 24px;

        .top-left-container {
            display: flex;

            .left-side {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;

                .avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 25px;
                }
            }
        }
    }

    .userpost {
        margin-bottom: 20px;
        word-wrap: break-word;
    }

    .grid-component {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .likes {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;

        .like-share {
            display: flex;
            justify-content: space-between;

            .interactive {
                display: flex;
                align-items: center;
            }
        }
    }

    .post-interact {
        background: transparent;
        outline: none;
        border: none;

        :hover {
            cursor: pointer;
        }
    }
`;
