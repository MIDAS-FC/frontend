import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PopupContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  width: 700px;
  height: 500px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ProfileImageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 20px; /* Rounded square */
  border: 1px solid #ccc; /* Optional border */
`;

export const GrayCircle = styled.div`
  width: 30px;
  height: 30px;
  background-color: gray;
  border-radius: 50%;
  position: absolute;
  bottom: -5px; /* Adjust as needed */
  right: -5px; /* Adjust as needed */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  input[type="file"] {
    display: none;
  }

  label {
    cursor: pointer;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px; /* Adjust as needed */
`;

export const UserName = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

export const NicknameButton = styled.button`
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  margin-top: 5px;
  text-align: left;
  padding: 0;
`;

export const ResetPasswordButton = styled.button`
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  margin-top: 5px;
  text-align: left;
  padding: 0;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  max-width: 200px; /* Adjust as needed */
`;

export const ConfirmButton = styled.button`
  margin-left: 10px;
  padding: 8px 12px;
  background-color: gray;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
`;
