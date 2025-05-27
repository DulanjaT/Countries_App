import { supabase } from "../../config/superbase";
import { Country } from "../../types/country";
import { CountryFavorite } from "../../types/favorite";

let favoritesCache: CountryFavorite[] | null = null;
let lastFetchTime = 0;
const CACHE_EXPIRY = 30000;

export const favoritesApi = {
  async getFavorites(useCache = true): Promise<CountryFavorite[]> {
    const now = Date.now();
    if (useCache && favoritesCache && now - lastFetchTime < CACHE_EXPIRY) {
      return favoritesCache;
    }

    const { data, error } = await supabase
      .from("country_favorites")
      .select("*");

    if (error) throw new Error(error.message);

    favoritesCache = data || [];
    lastFetchTime = now;
    return favoritesCache;
  },

  async addFavorite(country: Country): Promise<CountryFavorite> {
    const { data, error } = await supabase
      .from("country_favorites")
      .insert([
        {
          country_name: country.name.common,
          country_code: country.cca3,
          country_flag: country.flags.png,
        },
      ])
      .select()
      .single();

    if (error) throw new Error(error.message);
    if (favoritesCache) favoritesCache.push(data);
    return data;
  },

  async removeFavorite(countryName: string): Promise<void> {
    const { error } = await supabase
      .from("country_favorites")
      .delete()
      .eq("country_name", countryName);

    if (error) throw new Error(error.message);
    if (favoritesCache) {
      favoritesCache = favoritesCache.filter(
        (fav) => fav.country_name !== countryName
      );
    }
  },

  async isFavorite(countryName: string): Promise<boolean> {
    if (favoritesCache) {
      return favoritesCache.some((fav) => fav.country_name === countryName);
    }

    const { data, error } = await supabase
      .from("country_favorites")
      .select("id")
      .eq("country_name", countryName)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return !!data;
  },

  clearCache() {
    favoritesCache = null;
    lastFetchTime = 0;
  },
};
