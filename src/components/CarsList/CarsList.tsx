import React, { memo } from "react";
import CarInfo from "../../components/CarInfo";
import { CarsListTypes } from "./CarsList.types";

const CarsList = ({ cars }: CarsListTypes) => {
  return (
    <div>
      {cars.map(car => (
        <CarInfo key={car.id} {...car} />
      ))}
    </div>
  );
};

export default memo(CarsList);
