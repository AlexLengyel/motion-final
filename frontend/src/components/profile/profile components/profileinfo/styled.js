import styled from "styled-components";

export const BaseButton = styled.button`
    border-radius: 30px;
    background: none;
    border: 1px solid ${props => props.theme.lightGray};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${props => props.theme.smaller};
    font-weight: ${props => props.theme.mediumWeight};
`

export const EditProfileButton = styled(BaseButton)`
  background-color: #FFFFFF;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  margin-top: 20px;
  margin-bottom: 40px;
  font-size: 14px;
  
  :hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.05) !important;
    }
`