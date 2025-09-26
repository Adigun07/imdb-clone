import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchbarContext } from "../contexts/SearchbarContext";
import {
  search,
  getMediaCredits,
  mediaTypes,
} from "../services/tmbdServices.js";
import { useDebounce, useQuery, useImage } from "../services/customHooks.js";
import Loading from "./Loading.jsx";
import TriangleIcon from "../assets/triangle.svg?react";
import SearchIcon from "../assets/search.svg?react";
import CloseIcon from "../assets/close.svg?react";

const MovieElement = ({ movieObj }) => {
  const castArray = useQuery(
    () => getMediaCredits("movie", movieObj.id),
    `getMediaCredits-movie-${movieObj.id}`,
  )?.cast;

  const actors =
    castArray !== undefined
      ? castArray
          .slice(0, 2)
          .map((a) => a.name)
          .join(", ")
      : "";

  const releaseYear = movieObj.release_date
    ? new Date(movieObj.release_date).getFullYear()
    : "";

  return (
    <div className="flex gap-4 p-2 items-center border-b-1 border-white/25">
      <img src={useImage(movieObj.poster_path)} className="w-12 rounded-lg" />
      <div>
        <h2>{movieObj.title}</h2>
        <div>{releaseYear}</div>
        <div>{`${actors}`}</div>
      </div>
    </div>
  );
};

const TvElement = ({ tvObj }) => {
  const castArray = useQuery(
    () => getMediaCredits("tv", tvObj.id),
    `getMediaCredits-tv-${tvObj.id}`,
  )?.cast;

  const actors =
    castArray !== undefined
      ? castArray
          .slice(0, 2)
          .map((a) => a.name)
          .join(", ")
      : "";

  const releaseYear = tvObj.first_air_date
    ? new Date(tvObj.first_air_date).getFullYear()
    : "";

  return (
    <div className="flex gap-4 p-2 items-center border-b-1 border-white/25">
      <img src={useImage(tvObj.poster_path)} className="w-12 rounded-lg" />
      <div>
        <h2>{tvObj.name}</h2>
        <div>{releaseYear}</div>
        <div>{`${actors}`}</div>
      </div>
    </div>
  );
};

const PersonElement = ({ personObj }) => {
  return (
    <div className="flex gap-4 p-2 items-center border-b-1 border-white/25">
      <img src={useImage(personObj.profile_path)} className="w-12 rounded-lg" />
      <div>
        <h2>{personObj.name}</h2>
        <div>{personObj.known_for_department}</div>
        <div>
          {personObj.known_for[0]?.title ?? personObj.known_for[0]?.name}
        </div>
      </div>
    </div>
  );
};

const CompanyElement = ({ companyObj }) => {
  return (
    <div className="flex gap-4 p-2 items-center border-b-1 border-white/25">
      <img src={useImage(companyObj.logo_path)} className="w-12 rounded-lg" />
      <div>
        <h2>{companyObj.name}</h2>
      </div>
    </div>
  );
};

const SearchPreview = () => {
  const { inputValue, options, index } = useSearchbarContext();
  const debouncedInput = useDebounce(inputValue);

  const searchResult = useQuery(
    () => search(options[index].name, debouncedInput),
    `search-${options[index].name}-${debouncedInput}-1`,
  );
  if (
    debouncedInput !== "" &&
    (searchResult?.results === undefined || searchResult.results.length === 0)
  ) {
    return (
      <div className="grid place-items-center h-30 sm:h-50 text-red-500 font-semibold">
        No results found.
      </div>
    );
  }

  return (
    <>
      {searchResult?.results?.slice(0, 8)?.map((result) => {
        if (!result.media_type) {
          result.media_type = mediaTypes[options[index].name];
        }
        switch (result.media_type) {
          case "movie":
            return (
              <MovieElement movieObj={result} key={`movie-${result.id}`} />
            );
          case "tv":
            return <TvElement tvObj={result} key={`tv-${result.id}`} />;
          case "person":
            return (
              <PersonElement personObj={result} key={`person-${result.id}`} />
            );
          case "company":
            return (
              <CompanyElement
                companyObj={result}
                key={`company-${result.id}`}
              />
            );
        }
      })}
    </>
  );
};

const SearchSelect = ({ variant }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { index, setIndex, options } = useSearchbarContext();

  return (
    <>
      <div
        className={`fixed inset-0 ${variant === "large" ? "bg-transparent" : "bg-[hsl(0,0%,12%)]/50"} z-30 ${isOpen ? "block" : "hidden"}`}
        onClick={() => setIsOpen(false)}
      />

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center gap-1.5 px-3 py-1 text-left whitespace-nowrap
					${
            variant === "large"
              ? "bg-white text-black rounded-l-xs border-r-1 relative"
              : ""
          }`}
        style={variant === "large" ? { anchorName: "--search-btn" } : {}}
      >
        <span className="text-sm font-semibold">{options[index].name}</span>
        <TriangleIcon className={`size-2.5 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <div
        className={`bg-gray-secondary text-white z-40 transition-opacity ${
          variant === "large"
            ? "absolute w-44 rounded-sm"
            : "fixed bottom-0 left-0 right-0 rounded-t-sm pt-2 pb-5 "
        } ${isOpen ? "opacity-100 starting:opacity-0" : "opacity-0 hidden"}`}
        style={
          variant === "large"
            ? {
                positionAnchor: "--search-btn",
                top: "calc(anchor(bottom) + 4px)",
                left: "anchor(left)",
              }
            : {}
        }
      >
        {options.map((option, i) => {
          const isActive = i === index;
          return (
            <button
              type="button"
              key={i}
              className={`flex hover:bg-gray-hover gap-3 py-3 px-4 group w-full ${
                isActive ? "text-yellow" : ""
              }`}
              onClick={() => {
                setIndex(i);
                setIsOpen(false);
              }}
            >
              <option.icon
                className={`${
                  isActive
                    ? "text-yellow"
                    : "text-gray-light group-hover:text-white"
                } size-6`}
              />
              <span>{option.name}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};

const SmallSearchbar = () => {
  const { setInputValue, inputValue, handleSubmit } = useSearchbarContext();
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
        className={`absolute bg-gray-secondary z-2 w-full text-white transition-all ${isOpen ? "flex top-0 " : "-top-[100%] hidden"} starting:-top-[100%]`}
      >
        <SearchSelect variant="small" />

        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          id="input"
          autoComplete="off"
          className="peer bg-gray-secondary outline-0 p-4 w-full rounded-r-xs"
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
        <div
          className={
            "hidden opacity-0 peer-focus:block peer-focus:opacity-100 peer-focus:starting:opacity-0 transition-opacity transition-discrete absolute bottom-0 top-[100%] h-fit w-full bg-gray-secondary overflow-y-auto rounded-sm"
          }
        >
          <Suspense
            fallback={<Loading className="h-30 grid place-items-center" />}
          >
            <SearchPreview />
          </Suspense>
        </div>
      </form>
    </>
  );
};

const LargeSearchbar = () => {
  const { setInputValue, inputValue, handleSubmit } = useSearchbarContext();
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-200 flex rounded-xs relative"
    >
      <SearchSelect variant="large" />

      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        autoComplete="off"
        id="search-input"
        className="peer bg-white text-black pl-2 pr-9 py-1 w-full rounded-r-xs"
      />
      <button className="search-submit">
        <SearchIcon className="size-6 text-black/54" />
      </button>
      <div
        className={
          "hidden opacity-0 peer-focus:block peer-focus:opacity-100 peer-focus:starting:opacity-0 transition-opacity transition-discrete absolute bottom-0 top-[100%] h-fit w-full bg-gray-secondary overflow-y-auto rounded-sm"
        }
      >
        <Suspense
          fallback={<Loading className="h-50 grid place-items-center" />}
        >
          <SearchPreview />
        </Suspense>
      </div>
    </form>
  );
};

const Searchbar = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640);

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
    <>
      <LargeSearchbar />
    </>
  ) : (
    <>
      <SmallSearchbar />
      {/* <SearchPreview className={"fixed inset-0 bg-red-900 flex"} /> */}
    </>
  );
};

export default Searchbar;
