import React, { useEffect, useState } from "react";
import CarsList from "../../components/CarsList";
import Button from "../../components/Button";
import { fetchCars } from "../../controllers/documents";
import { getBodyTypes } from "../../utils/parse";
import styled from "styled-components";
import { CarInfoTypes } from "../../components/CarInfo/CarInfo.types";

const ButtonContainer = styled.div`
  margin-bottom 20px;
`;

const GroupedListContaienr = styled.div`
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const GroupTitle = styled.div`
  margin-bottom: 15px;
  margin-left: 5px;
  font-weight: 600;
`;

const CarsTableContainer = () => {
  const [cars, setCars] = useState<CarInfoTypes[]>([]);
  const [bodyTypesGroup, setBodyTypesGroup] = useState<string[]>([]);
  const [isGrouped, setIsGrouped] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await fetchCars();
      const bodyTypes = getBodyTypes(response);
      setCars(response);
      setBodyTypesGroup(bodyTypes);
    })();
  }, []);

  return (
    <div>
      <ButtonContainer>
        <Button
          isActive={isGrouped}
          onClick={() => {
            setIsGrouped(!isGrouped);
          }}
        >
          Сгруппировать по типу кузова
        </Button>
      </ButtonContainer>
      {isGrouped ? (
        bodyTypesGroup.map(type => (
          <GroupedListContaienr>
            <GroupTitle>{type}</GroupTitle>
            <div>
              <CarsList cars={cars.filter(car => car.bodyType === type)} />
            </div>
          </GroupedListContaienr>
        ))
      ) : (
        <CarsList cars={cars} />
      )}
    </div>
  );
};

export default CarsTableContainer;
