import styled from 'styled-components';

export const EditContainer = styled.div`
    display: flex;
    position: relative;
    top: 50px;
    height: 730px;
    width: 1152px;
    left: 0;
    right: 0;
    margin: 0 auto;
    background: white;
    border-radius: 4px;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2), 0px 10px 20px rgba(0, 0, 0, 0.05);
`;


export const LeftContainer = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 27.7%;
  min-width: 158px;
  border-right: 2px solid ${props => props.theme.lightGray};
`;

export const RightContainer = styled.div`
  width: 72.3%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;


export const AvatarWrapper = styled.img`
  height: 80px;
  width: 80px;
  border: none;
  border-radius: 40px; 
  object-fit: cover;
`;

export const ProfileButtons = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`


export const StandardButton = styled.button`
    border-radius: 30px;
    background: none;
    border: 1px solid ${props => props.theme.lightGray};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${props => props.theme.smaller};
    font-weight: ${props => props.theme.mediumWeight};
`

export const UpdateAvatarButton = styled(StandardButton)`
  background-color: #FFFFFF;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  margin-top: 20px;
  margin-bottom: 40px;
  font-size: 14px;
  :hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.05);
    }
`

export const SaveDeleteButton = styled(UpdateAvatarButton)`
    margin-bottom: 0px;
`


export const UpdateImage = styled.div`
  width: 80px;
  box-shadow: 0px 10px 20px 0px #0000000d;
  box-shadow: 0px 0px 1px 0px #00000033;
  border-radius: 4px;
  display: flex;
  justify-content: space-space-around;
  flex-direction: column;
  align-content: center;
`;

export const SaveDelete = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
`
export const InputFields = styled.div`
    display: flex;
    height: 60%;
    width: 100%;
    margin-top: 30px;
    justify-content: space-around;
`

export const Information = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    width: 40%;
    justify-content: space-between;
`;

export const EditInfoLabel = styled.label`
  color: rgba(0, 0, 0, 0.5);
  font-size: 12px;
`;

export const EditInfo = styled.input`
    width: 100%;
    margin-bottom: 5px;
    height: 45px;
    border: none;
    outline: none;
    border-bottom: 1px solid ${props => props.theme.lightGray};
    
        ::placeholder {
        color: black;
    }
`

export const LeftInformation = styled(Information)`
margin-right: 5px;
`;
export const RightInformation = styled(Information)`
margin-left: 5px;
`;

export const HobbySection = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0px 35px;
`;

export const HobbyTitle = styled.div`
  width: 100%
  display: flex;
  justify-content: flex-start;
  font-size: 14px;
`;

export const Hobbies = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-content: flex-start;
  font-size: 14px;
`;

export const ThingsLiked = styled.button`
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  background: rgba(0, 0, 0, 0.05);
  border: none;
  border-radius: 18px;
  padding: 8px 16px;
  margin-right: 5px;
  margin-bottom: 5px;
`;

export const DeleteIcon = styled.img`
  width: 10px;
  height: 10px;
  margin-left: 5px;
`;

export const HobbyInput = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
`;

export const AddHobbies = styled(EditInfo)`
    margin-right: 20px;
`