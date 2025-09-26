import axios from "axios";
import { use, useEffect, useState } from "react";
import NoImage from "../assets/no-image.jpeg";

export const useDebounce = (value, duration = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, duration);
    return () => {
      clearTimeout(timeout);
    };
  }, [value, duration]);

  return debouncedValue;
};

const promiseCache = new Map();
export const useQuery = (func, key) => {
  if (!promiseCache.get(key)) {
    promiseCache.set(key, func());
  }
  const promise = promiseCache.get(key);
  const result = use(promise);
  return result;
};

const baseImageUrl = "https://image.tmdb.org/t/p/w500";
export const useImage = (imagePath) => {
  const fetchImage = async () => {
    try {
      const response = await axios.get(`${baseImageUrl}${imagePath}`, {
        responseType: "blob",
      });
      const imageUrl = URL.createObjectURL(response.data);
      return imageUrl;
    } catch (e) {
      console.error(e);
      if (e.code === "ERR_NETWORK" && navigator.onLine) {
        return `${baseImageUrl}${imagePath}`;
      }
      return NoImage;
    }
  };
  return useQuery(fetchImage, imagePath);
};
