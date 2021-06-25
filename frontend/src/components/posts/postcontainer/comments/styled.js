import styled from 'styled-components'

export const NewComment = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .comment-text {
    width: 100%;
    resize: none;
    outline: none;
    border: none;
    font-size: ${props => props.theme.small};
  }
  
  .comment-image {
    margin-left: 50px;

    input {
      display: none;
    }
    img {
      width: 20px;
      :hover {
        cursor: pointer;
      }
    }
  }
  }
`

export const ListComments = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  
    .text-wrapper {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 10px;
      
      .profile-pic {
        width: 35px;
        height: 35px;
        border-radius: 45px;
      }
      
      .comment-body {
        display: flex;
        background: ${props => props.theme.profileBackground};
        box-shadow: ${props => props.theme.boxShadow};
        border-radius: 15px;
        width: auto;
        flex-direction: column;
        padding: 15px;
        margin-left: 10px;
        
        .info {
          padding-bottom: 5px;
        }
        
        span {
          font-size: ${props => props.theme.small};
          font-weight: 700;
        }
        
        .timestamp {
          font-size: ${props => props.theme.smaller};
          padding-left: 10px;
          color: ${props => props.theme.gray}
        }
        
        p {
          font-size: ${props => props.theme.small};
        }
      }
    }
  
    .image-wrapper {
      padding-left: 55px;
      img {
        width: 300px;
      }
    }
    
    .toggle-display {
      display: flex;
      justify-content: center;
      width: 100%;
      button {
        width: 100%;
        height: 25px;
        border-radius: 35px;
        background: darkgray;
        color: white;
        border: none;
        text-shadow: 2px 1px 3px rgba(0,0,0,0.52)
;
        
        :active {
          transform: translateY(0.5px);
        }
      }
    }
`