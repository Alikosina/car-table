import axios from "axios";
import { parseData, parseCarDescription } from "../utils/parse";

export const fetchAttributes = async () => {
  const { data } = await axios.get("/documents/data-attributes.csv");
  return parseData(data).reduce(
    (result: any, attribute: any) => ({
      ...result,
      [attribute.ID]: attribute.Description
    }),
    {}
  );
};

export const fetchColors = async () => {
  const { data } = await axios.get("/documents/data-colors.csv");
  const attributes = await fetchAttributes();
  return parseData(data).reduce((result: any, color: any) => {
    const colorResult: any = {};
    color.Attribute.split(",").forEach((carId: string) => {
      colorResult[carId] = attributes[color.ID];
    });
    return {
      ...result,
      ...colorResult
    };
  }, {});
};

export const fetchOptions = async () => {
  const { data } = await axios.get("/documents/data-options.csv");
  const attributes = await fetchAttributes();
  return parseData(data).reduce((result: any, option: any) => {
    const optionResult: any = {};
    option.ID.split(",").forEach((carId: string) => {
      optionResult[carId] = result[carId]
        ? `${result[carId]} ${attributes[option.Attribute]}`
        : attributes[option.Attribute];
    });
    return {
      ...result,
      ...optionResult
    };
  }, {});
};

export const fetchCountries = async () => {
  const { data } = await axios.get("/documents/data-countries.csv");
  return parseData(data).reduce(
    (result: any, country: any) => ({
      ...result,
      [country.ISO]: country.Description
    }),
    {}
  );
};

export const fetchCars = async () => {
  const { data } = await axios.get("/documents/data-auto.csv");
  const options = await fetchOptions();
  const colors = await fetchColors();
  const countries = await fetchCountries();
  return parseData(data).map((car: any) => ({
    id: car.ID,
    description: car.Description,
    color: colors[car.ID] || "",
    options: options[car.ID] || "",
    ...parseCarDescription(car.Description, countries)
  }));
};
