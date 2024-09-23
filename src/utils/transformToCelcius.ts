export const transformToCelcius = (kelvin: number | undefined): number => {
    if (kelvin === undefined) return 0;
    return parseFloat((kelvin - 273.15).toFixed(1));
  };