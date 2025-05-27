import { Country } from "../../types/country";

export const countriesApi = {
  async getAllCountries(): Promise<Country[]> {
    const res = await fetch("https://restcountries.com/v3.1/all");
    if (!res.ok) throw new Error("Failed to fetch countries");
    return res.json();
  },

  async getCountryByCode(code: string): Promise<Country> {
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    if (!res.ok) throw new Error("Failed to fetch country");
    const data = await res.json();
    return data[0];
  },
};
