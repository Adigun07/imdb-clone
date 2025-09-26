import axios from "axios";
const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export const mediaTypes = {
  All: "multi",
  Titles: "movie",
  TV: "tv",
  Celebs: "person",
  Companies: "company",
};

// caching syntax=search-type-query-page
export const search = async (type, query, page = 1) => {
  if (query === "") {
    return {};
  }
  try {
    const response = await axios({
      url: `${BASE_URL}/search/${mediaTypes[type]}?query=${query}&page=${page}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    const data = response.data;
    return data;
  } catch (e) {
    console.error(e);
    return {};
  }
};

// caching syntax=getMediaData-mediaType-id
export const getMediaCredits = async (mediaType, id) => {
  try {
    const response = await axios({
      url: `${BASE_URL}/${mediaType}/${id}/credits`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    const data = response.data;
    return data;
  } catch (e) {
    console.error(e);
    return {};
  }
};
