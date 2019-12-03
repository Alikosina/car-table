import React, { memo } from "react";
import styled from "styled-components";

const ButtonComponent = ({ children, onClick, isActive }: any) => {
  const Button = styled.button`
    color: ${isActive ? "#fff" : "black"}
  padding: 10px;
  background: ${isActive ? "cornflowerblue" : "#fff"};
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  cursor: pointer;
  text-transform: uppercase;
  outline: none;
`;
  return <Button onClick={onClick}>{children}</Button>;
};

export default memo(ButtonComponent);
