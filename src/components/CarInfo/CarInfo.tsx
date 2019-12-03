import React, { memo, useState, useCallback } from "react";
import { CarInfoTypes } from "./CarInfo.types";
import styled from "styled-components";

const CarInfoContainer = styled.div`
  border: 1px solid #d3d3d3;
  &:not(:first-child) {
    border-top: none;
  }
  &:first-child {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  &:last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

const CarsDetailsContainer = styled.div`
  padding: 20px;
  display: flex;
  & > div {
    margin-right: 25px;
    width: 20%;
    &:last-child {
      margin-right: 0;
    }
  }
`;

const DetailHeader = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;

const CarInfo = ({
  mark,
  model,
  bodyType,
  color,
  options,
  year,
  country
}: CarInfoTypes) => {
  const [isOpen, setIsOpen] = useState(false);

  const CarBaseInfoContainer = styled.div`
    display: flex;
    cursor: pointer;
    padding: 20px;
    border-bottom: ${isOpen ? "1px solid #d3d3d3" : "none"};
    & > div {
      width: 25%;
    }
  `;

  const onClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  return (
    <CarInfoContainer>
      <CarBaseInfoContainer onClick={onClick}>
        <div>{mark}</div>
        <div>{model}</div>
        <div>{bodyType}</div>
        <div>{year}</div>
      </CarBaseInfoContainer>
      {isOpen && (
        <CarsDetailsContainer>
          {color && (
            <div>
              <DetailHeader>Цвет</DetailHeader>
              <div>{color}</div>
            </div>
          )}
          {options && (
            <div>
              <DetailHeader>Опции</DetailHeader>
              <div>{options}</div>
            </div>
          )}
          {country && (
            <div>
              <DetailHeader>Страна</DetailHeader>
              <div>{country}</div>
            </div>
          )}
          <div>
            <DetailHeader>Год</DetailHeader>
            <div>{year}</div>
          </div>
        </CarsDetailsContainer>
      )}
    </CarInfoContainer>
  );
};

export default memo(CarInfo);
