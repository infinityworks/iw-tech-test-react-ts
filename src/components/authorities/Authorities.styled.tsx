import styled from "styled-components";

export const ErrorDiv = styled.div`
  color: white;
  background: black;
  padding: 5px;
  width: max-content;
  margin-left: 50px;
`;

export const TD = styled.td`
  text-align: center;
`;

export const ButtonArea = styled.div`
  margin-top: 10px;
  height: 20px;
`

export const Button = styled.div`
  color: white;
  font-weight: bold;
  width: fit-content;

  &:hover {
    cursor: pointer;
  }
`

export const LoadingInfo = styled.p`
  color: white;
  background: black;
  margin-left: 50px;
  padding: 10px 15px;
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
  width: fit-content;
`