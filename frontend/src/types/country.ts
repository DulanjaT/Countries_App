export interface CountryName {
  common: string;
  official: string;
  nativeName?: Record<string, { official: string; common: string }>;
}

export interface CountryFlags {
  png: string;
  svg: string;
  alt?: string;
}

export interface Country {
  name: CountryName;
  flags: CountryFlags;
  cca3: string;
  capital: string[];
  region: string;
  subregion: string;
  population: number;
  area: number;
}
