import parse from "csv-parse/lib/sync";

export const parseData = (data: string) => {
  return parse(data, {
    columns: true,
    skip_empty_lines: true
  });
};

export const parseCarDescription = (description: string, countries: any) =>
  description
    .split(" ")
    .reduce((result: any, element: string, index: number, arr: string[]) => {
      switch (index) {
        case 0:
          return { ...result, mark: element };
        case arr.length - 1:
          return { ...result, country: countries[element] };
        case arr.length - 2:
          return { ...result, year: element };
        case arr.length - 3:
          return { ...result, bodyType: element };
        default:
          return {
            ...result,
            model: `${result.model ? `${result.model} ` : ""}${element}`
          };
      }
    }, {});

export const getBodyTypes = (cars: any[]) => {
  console.log("here!!");
  return cars.reduce((result: string[], car: any) => {
    return Array.from(new Set([...result, car.bodyType]));
  }, []);
};
