import { createContext, useContext, useState } from "react";
import MovieIcon from "../assets/movies.svg?react";
import TvIcon from "../assets/tv.svg?react";
import CelebsIcon from "../assets/celebs.svg?react";
import BuildingsIcon from "../assets/buildings.svg?react";
import SearchIcon from "../assets/search.svg?react";

const SearchbarContext = createContext();

export const SearchbarProvider = ({ children }) => {
  const [index, setIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputValue, options[index].name);
  };

  const options = [
    {
      name: "All",
      icon: SearchIcon,
    },
    {
      name: "Titles",
      icon: MovieIcon,
    },
    {
      name: "TV",
      icon: TvIcon,
    },
    {
      name: "Celebs",
      icon: CelebsIcon,
    },
    {
      name: "Companies",
      icon: BuildingsIcon,
    },
  ];
  return (
    <SearchbarContext.Provider
      value={{
        index,
        setIndex,
        inputValue,
        setInputValue,
        options,
        handleSubmit,
      }}
    >
      {children}
    </SearchbarContext.Provider>
  );
};

export const useSearchbarContext = () => {
  const val = useContext(SearchbarContext);
  if (val == null)
    throw Error("Cannot use SidebarContext outside a SidebarProvider");
  return val;
};
