import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProfileImageContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin-right: 20px;
  border-radius: 40px;
`;

export const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 20px;
  border: 1px solid #ccc;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.h2`
  font-size: 20px;
  margin: 0;
  margin-bottom: 10px;
`;
