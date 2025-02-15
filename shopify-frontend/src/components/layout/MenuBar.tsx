import { useState } from "react";

const MenuBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`absolute top-1/8 left-5 transition duration-100 transform select-none ${
        isOpen ? "" : "-translate-x-75"
      }`}
    >
      {/* -translate-x-75 */}
      <div className="relative">
        <div className="h-120 w-70 rounded-lg bg-black"></div>
        <div
          className="absolute bg-black top-1/5 transform -translate-y-1/2 left-70 text-white"
          style={{
            width: "25px",
            height: "130px",
            clipPath: "polygon(100% 85%, 100% 15%, 0% 0%, 0% 100%)",
          }}
        >
          <button
            onClick={toggleMenu}
            className="transform pt-7 cursor-pointer"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "upright",
            }}
          >
            MENU
          </button>
        </div>
      </div>
    </nav>
  );
};

export default MenuBar;
