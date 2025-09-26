import { useState, useEffect, useRef } from "react";
import LogoIcon from "../assets/logo.svg?react";
import MenuIcon from "../assets/menu.svg?react";
import CloseIcon from "../assets/close.svg?react";
import MoviesIcon from "../assets/movies.svg?react";
import TvIcon from "../assets/tv.svg?react";
import WatchIcon from "../assets/watch.svg?react";
import CelebsIcon from "../assets/celebs.svg?react";
import AwardsIcon from "../assets/awards.svg?react";
import CommunityIcon from "../assets/community.svg?react";
import ChevronIcon from "../assets/chevron.svg?react";

const smallMenuItems = [
  {
    title: "Movies",
    icon: MoviesIcon,
    children: [
      { name: "Release calendar", href: "#" },
      { name: "Top 250 movies", href: "#" },
      { name: "Most popular movies", href: "#" },
      { name: "Browse movies by genre", href: "#" },
      { name: "Top box office", href: "#" },
      { name: "Showtimes & tickets", href: "#" },
      { name: "Movie news", href: "#" },
      { name: "India movie spotlight", href: "#" },
    ],
  },

  {
    title: "TV shows",
    icon: TvIcon,
    children: [
      { name: "What's on TV & streaming", href: "#" },
      { name: "Top 250 TV shows", href: "#" },
      { name: "Most popular TV shows", href: "#" },
      { name: "Browse TV shows by genre", href: "#" },
      { name: "TV news", href: "#" },
    ],
  },
  {
    title: "Watch",
    icon: WatchIcon,
    children: [
      { name: "What to watch", href: "#" },
      { name: "Latest trailers", href: "#" },
      { name: "IMDb Originals", href: "#" },
      { name: "IMDb Picks", href: "#" },
      { name: "IMDb Spotlight", href: "#" },
      { name: "Family entertainment guide", href: "#" },
      { name: "IMDb Podcasts", href: "#" },
    ],
  },
  {
    title: "Awards & events",
    icon: AwardsIcon,
    children: [
      { name: "Oscars", href: "#" },
      { name: "Emmys", href: "#" },
      { name: "Toronto Int'l Film Festival", href: "#" },
      { name: "Hispanic Heritage Month", href: "#" },
      { name: "IMDb Stars to Watch", href: "#" },
      { name: "STARmeter Awards", href: "#" },
      { name: "Awards Central", href: "#" },
      { name: "Festival Central", href: "#" },
      { name: "All events", href: "#" },
    ],
  },
  {
    title: "Celebs",
    icon: CelebsIcon,

    children: [
      { name: "Born today", href: "#" },

      { name: "Most popular celebs", href: "#" },
      { name: "Celebrity news", href: "#" },
    ],
  },
  {
    title: "Community",
    icon: CommunityIcon,
    children: [
      { name: "Help center", href: "#" },
      { name: "Contributor zone", href: "#" },
      { name: "Polls", href: "#" },
    ],
  },
];

const SmallMenuDropdown = ({ smallMenuItem, onToggle, isOpen }) => {
  const dropdownContentRef = useRef();

  useEffect(() => {
    if (isOpen) {
      dropdownContentRef.current.style.maxHeight =
        dropdownContentRef.current.scrollHeight + "px";
    } else {
      dropdownContentRef.current.style.maxHeight = null;
    }
  }, [isOpen]);

  return (
    <div className={`${isOpen ? "border-b-1 border-b-gray-light" : ""}`}>
      <button
        className={`flex justify-between w-full py-2 px-4 active:bg-blue/40 text-gray-light  ${isOpen ? "text-yellow" : "focus:text-white"}`}
        onClick={onToggle}
      >
        <div className="flex gap-2">
          <smallMenuItem.icon className="size-6 " />
          <div className={`${!isOpen ? "text-white" : ""}`}>
            {smallMenuItem.title}
          </div>
        </div>
        <ChevronIcon
          className={`size-6 ${isOpen ? "-rotate-90 text-white" : "rotate-90"} transition-transform`}
        />
      </button>
      <ul
        ref={dropdownContentRef}
        className="flex flex-col gap-2 mb-2 max-h-0 overflow-hidden transition-[max-height] duration-300 ease-in-out ml-12"
      >
        {smallMenuItem.children.map((child, index) => (
          <li key={index}>{child.name}</li>
        ))}
      </ul>
    </div>
  );
};

const SmallMenu = ({ handleClose, isOpen }) => {
  const menuRef = useRef();
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      <div
        className={`fixed inset-0 bg-[hsl(0,0%,12%)]/50 z-5 ${isOpen ? "block" : "hidden"}`}
        onClick={handleClose}
      ></div>
      <div className={`small-menu ${isOpen ? "open" : ""}`} ref={menuRef}>
        <button
          className="size-8 rounded-full cursor-pointer flex items-center justify-center mr-4 ml-auto mb-4"
          onClick={handleClose}
        >
          <CloseIcon className="text-white size-6" />
        </button>
        {smallMenuItems.map((item, index) => (
          <SmallMenuDropdown
            key={index}
            smallMenuItem={item}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </>
  );
};

const LargeMenu = ({ handleClose, isOpen }) => {
  return (
    <div className={`large-menu ${isOpen ? "open" : ""}`}>
      <div className="grid justify-items-center grid-cols-3 gap-x-20 w-fit mx-auto py-10 ">
        <div className="flex justify-between items-center span-2 col-span-3 mb-10 justify-self-stretch">
          <LogoIcon className="w-25" />
          <button
            className="size-10 rounded-full bg-yellow cursor-pointer flex items-center justify-center"
            onClick={handleClose}
          >
            <CloseIcon className="size-5 text-black" />
          </button>
        </div>

        <div className="flex gap-2">
          <div>
            <MoviesIcon className="size-6 text-yellow mt-1" />
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-2xl">Movies</h2>
            <div>Release calendar</div>
            <div>Top 250 movies</div>
            <div>Most popular movies</div>
            <div>Browse movies by genre</div>
            <div>Top box office</div>
            <div>Showtimes & tickets</div>
            <div>Movie news</div>
            <div>India movie spotlight</div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex gap-2">
            <div>
              <TvIcon className="size-6 text-yellow mt-1" />
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="font-bold text-2xl">TV shows</h2>
              <div>What's on TV & streaming</div>
              <div>Top 250 TV shows</div>
              <div>Most popular TV shows</div>
              <div>Browse TV shows by genre</div>
              <div>TV news</div>
            </div>
          </div>
          <div className="flex gap-2">
            <div>
              <WatchIcon className="size-6 text-yellow mt-1" />
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="font-bold text-2xl">Watch</h2>
              <div>What to watch</div>
              <div>Latest trailers</div>
              <div>IMDb Originals</div>
              <div>IMDb Picks</div>
              <div>IMDb Spotlight</div>
              <div>Family entertainment guide</div>
              <div>IMDb Podcasts</div>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <div>
            <AwardsIcon className="size-6 text-yellow mt-1" />
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-2xl">Awards & eventes</h2>
            <div>Oscars</div>
            <div>Emmys</div>
            <div>Toronto Int'l Film Festival</div>
            <div>IMDb Stars to Watch</div>
            <div>STARmeter Awards</div>
            <div>Awards Central</div>
            <div>Festival Central</div>
            <div>All events</div>
          </div>
        </div>

        <div className="flex gap-2">
          <div>
            <CelebsIcon className="size-6 text-yellow mt-1" />
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-2xl">Celebs</h2>
            <div>Born today</div>
            <div>Most popular celebs</div>
            <div>Celebrity News</div>
          </div>
        </div>
        <div></div>
        <div className="flex gap-2">
          <div>
            <CommunityIcon className="size-6 text-yellow mt-1" />
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-2xl">Community</h2>
            <div>Help center</div>
            <div>Contributor zone</div>
            <div>Polls</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <button
        className="flex items-center font-bold hover:bg-gray-hover active:bg-gray-medium rounded-4xl px-3 py-1 gap-1 max-[1024px]:-order-1"
        onClick={open}
      >
        <MenuIcon className="size-6" />
        <span className="hidden lg:inline">Menu</span>
      </button>
      {isLargeScreen ? (
        <LargeMenu handleClose={close} isOpen={isOpen} />
      ) : (
        <SmallMenu handleClose={close} isOpen={isOpen} />
      )}
    </>
  );
};

export default Menu;
