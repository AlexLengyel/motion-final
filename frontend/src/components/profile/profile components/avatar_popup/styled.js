import styled from "styled-components"

export const UpdateUserImage = styled.div`
  box-shadow: 0px 10px 20px 0px #0000000d;
  box-shadow: 0px 0px 1px 0px #00000033;
  border-radius: 4px;
  display: flex;
  visibility: ${props => props.display ? 'visible' : 'hidden'};
  margin-bottom: 30px;
  justify-content: space-space-around;
  flex-direction: column;
  align-content: center;
  size: 14px;
`;

export const UpdateButton = styled.button`
  background-color: #FFFFFF;
  border: none;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-content: center;
  padding: 10px 20px;
  font-size: 14px;
  :hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export const ImageWrapper = styled.img`
  opacity: 0.2;
  // width: 14px;
  // height: 18px;
  margin-right: 10px;
`;

export const FileUpload = styled.input`
  display: none;
`;