// import styled from "styled-components";

// export const Container = styled.div`
//   width: 100%;
//   max-width: 1200px;
//   margin: auto;
//   padding: 20px;
//   background-color: #fafafa;
//   border-radius: 12px;
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
//   transition: transform 0.3s ease, box-shadow 0.3s ease;
//   &:hover {
//     transform: translateY(-5px);
//     box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
//   }

//   h1 {
//     font-size: 24px;
//     text-align: center;
//     margin-bottom: 20px;
//     color: #333;
//   }

//   p {
//     font-size: 16px;
//     color: #666;
//     text-align: center;
//     margin: 20px 0;
//   }
// `;

// export const Header = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 100%;
//   padding: 10px;
//   margin-top: 40px;

//   h2 {
//     margin: 0 20px;
//   }

//   button {
//     background: none;
//     border: none;
//     font-size: 1.5rem;
//     cursor: pointer;
//   }
// `;

// export const GraphContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   margin: 20px 0;
//   margin-top: 40px;
// `;

// export const ReportBox = styled.div`
//   width: 80%;
//   margin: 20px auto;
//   margin-top: 40px;
//   padding: 20px;
//   border: 1px solid #ddd;
//   border-radius: 10px;
//   background-color: #f9f9f9;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   line-height: 1.5;

//   h3 {
//     font-size: 20px;
//     margin-bottom: 15px;
//     color: #333;
//   }
// `;

// export const List = styled.ul`
//   list-style-type: disc;
//   padding-left: 20px;
//   margin: 10px;
// `;

// export const ListItem = styled.li`
//   margin-bottom: 10px;
// `;

// export const Text = styled.p`
//   margin-top: 20px;
//   font-size: 14px;
//   color: #666;
//   text-align: justify;
// `;

import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  background-color: #fafafa;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  }

  h1 {
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }

  p {
    font-size: 16px;
    color: #666;
    text-align: center;
    margin: 20px 0;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px;
  margin-top: 40px;

  h2 {
    margin: 0 20px;
  }

  button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
`;

export const GraphContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  margin-top: 40px;
`;

export const ReportBox = styled.div`
  width: 80%;
  margin: 20px auto;
  margin-top: 40px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  line-height: 1.5;

  h3 {
    font-size: 20px;
    margin-bottom: 15px;
    color: #333;
  }
`;

export const List = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
  margin: 10px;
`;

export const ListItem = styled.li`
  margin-bottom: 10px;
`;

export const Text = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #666;
  text-align: justify;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
