import { useState, useRef, useEffect } from "react";
import TriangleIcon from "../assets/triangle.svg?react";
import SearchIcon from "../assets/search.svg?react";
import MovieIcon from "../assets/movies.svg?react";
import TvIcon from "../assets/tv.svg?react";
import CelebsIcon from "../assets/celebs.svg?react";
import BuildingsIcon from "../assets/buildings.svg?react";
import TagIcon from "../assets/tag.svg?react";
import CloseIcon from "../assets/close.svg?react";

const SmallSearchSelect = ({ index, setIndex, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={`fixed inset-0 bg-[hsl(0,0%,12%)]/50 z-3 ${isOpen ? "block" : "hidden"}`}
        onClick={() => {
          setIsOpen(false);
        }}
      ></div>
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="flex items-center justify-center gap-1.5 px-3 py-1 text-left whitespace-nowrap"
      >
        <span className="text-sm font-semibold">{options[index].name}</span>
        <TriangleIcon className={`size-2.5 ${isOpen && "rotate-180"}`} />
      </button>
      <div
        className={`fixed bg-gray-secondary bottom-0 left-0 right-0 text-white z-10 rounded-t-sm pt-2 pb-5 transition-opacity ${isOpen ? "block opacity-100 starting:opacity-0" : "opacity-0 hidden"}`}
      >
        {options.map((option, i) => {
          const isActive = i === index;
          return (
            <button
              className={`flex hover:bg-gray-hover gap-3 py-3 px-4 group ${isActive ? "text-yellow" : ""} active:bg-gray-light`}
              key={i}
              onClick={() => {
                setIndex(i);
                setIsOpen(false);
              }}
              type="button"
            >
              <option.icon
                className={`${isActive ? "text-yellow" : "text-gray-light group-hover:text-white"} size-6`}
              />
              <span>{option.name}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};

const SmallSearchbar = ({
  index,
  setIndex,
  options,
  handleSubmit,
  inputRef,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        className="ml-auto"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <SearchIcon className="size-6" />
      </button>
      <form
        onSubmit={handleSubmit}
        className={`fixed bg-gray-secondary z-2 w-full text-white transition-all ${isOpen ? "flex top-0 " : "-top-[100%] hidden"} starting:-top-[100%]`}
      >
        <SmallSearchSelect
          index={index}
          setIndex={setIndex}
          options={options}
        />

        <input
          type="text"
          ref={inputRef}
          id="input"
          className="bg-gray-secondary outline-0 p-4 w-full rounded-r-xs"
          placeholder="Search IMDb"
        />
        <button
          type="button"
          className="pr-3"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <CloseIcon className="size-6" />
        </button>
      </form>
    </>
  );
};

const LargeSearchSelect = ({ index, setIndex, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="flex items-center justify-center gap-1.5 px-3 py-1 bg-white text-black rounded-l-xs border-r-1 relative text-left whitespace-nowrap"
        style={{ anchorName: "--search-btn" }}
      >
        <span className="text-sm font-semibold">{options[index].name}</span>
        <TriangleIcon className={`size-2.5 ${isOpen && "rotate-180"}`} />
      </button>

      <div
        className={`fixed inset-0 bg-transparent z-3 ${isOpen ? "block" : "hidden"}`}
        onClick={() => {
          setIsOpen(false);
        }}
      ></div>
      <div
        className={`absolute bg-gray-secondary text-white w-44 rounded-sm transition-opacity z-4 ${isOpen ? "opacity-100 starting:opacity-0" : "opacity-0 hidden"}`}
        style={{
          positionAnchor: "--search-btn",
          top: "calc(anchor(bottom) + 4px)",
          left: "anchor(left)",
        }}
        ref={dropdownRef}
      >
        {options.map((option, i) => {
          const isActive = i === index;
          return (
            <button
              className={`flex hover:bg-gray-hover active:bg-gray-light gap-3 py-3 px-4 group w-full  ${isActive ? "text-yellow" : ""}`}
              key={i}
              onClick={() => {
                setIndex(i);
                setIsOpen(false);
              }}
            >
              <option.icon
                className={`${isActive ? "text-yellow" : "text-gray-light group-hover:text-white"} size-6`}
              />
              <span>{option.name}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};

const LargeSearchbar = ({
  index,
  setIndex,
  options,
  handleSubmit,
  inputRef,
}) => {
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-200 flex rounded-xs">
      <LargeSearchSelect index={index} setIndex={setIndex} options={options} />

      <input
        type="text"
        ref={inputRef}
        id="search-input"
        className="bg-white text-black pl-2 pr-9 py-1 w-full rounded-r-xs"
      />
      <button className="search-submit">
        <SearchIcon className="size-6 text-black/54" />
      </button>
    </form>
  );
};

const Searchbar = () => {
  const [index, setIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640);
  const inputRef = useRef();

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
      name: "TV episodes",
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
    {
      name: "Keywords",
      icon: TagIcon,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputRef.current.value, options[index].name);
  };
  useEffect(() => {
    const abortController = new AbortController();
    window.addEventListener(
      "resize",
      () => {
        setIsSmallScreen(window.innerWidth < 640);
      },
      { signal: abortController.signal },
    );
    return () => {
      abortController.abort();
    };
  }, []);

  return !isSmallScreen ? (
    <LargeSearchbar
      index={index}
      setIndex={setIndex}
      options={options}
      handleSubmit={handleSubmit}
      inputRef={inputRef}
    />
  ) : (
    <SmallSearchbar
      index={index}
      setIndex={setIndex}
      options={options}
      handleSubmit={handleSubmit}
      inputRef={inputRef}
    />
  );
};

export default Searchbar;
