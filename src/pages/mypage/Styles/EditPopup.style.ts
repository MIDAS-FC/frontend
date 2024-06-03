import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PopupContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  width: 600px;
  max-width: 90%;
  max-height: 80%;
  overflow-y: auto;
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProfileImageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

export const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 1px solid #ccc;
`;

export const GrayCircle = styled.div`
  width: 40px;
  height: 40px;
  background-color: rgba(128, 128, 128, 0.5);
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 2px solid white;
  transition: background-color 0.3s;

  input[type="file"] {
    display: none;
  }

  label {
    cursor: pointer;
    font-size: 18px;
    color: white;
  }

  &:hover {
    background-color: white;

    label {
      color: black;
    }
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const UserName = styled.div`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
`;

export const ProfileUpdateButton = styled.button`
  background: #28a745;
  border: none;
  color: white;
  cursor: pointer;
  margin-top: 10px;
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 16px;
  transition: background-color 0.3s;
  width: 100%;
  max-width: 300px;

  &:hover {
    background-color: #218838;
  }
`;

export const ActionButton = styled.button`
  background: #007bff;
  border: none;
  color: white;
  cursor: pointer;
  margin-top: 10px;
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 16px;
  transition: background-color 0.3s;
  width: 100%;
  max-width: 300px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const NicknameButton = styled(ActionButton)`
  background: #007bff;
`;

export const ResetPasswordButton = styled(ActionButton)`
  background: #dc3545;

  &:hover {
    background-color: #c82333;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  font-size: 16px;
  margin-bottom: 10px;
`;

export const ConfirmButton = styled(ActionButton)`
  background-color: #28a745;

  &:hover {
    background-color: #218838;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: #87cefa;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 20px;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff1c1c;
  }

  &:focus {
    outline: none;
  }
`;
