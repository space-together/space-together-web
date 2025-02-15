"use client";
import { ThemeContext } from "@/context/theme/themeProviders";
import UseTheme from "@/context/theme/use-theme";
import { useContext } from "react";
import { BsCheck2Circle } from "react-icons/bs";
const SettingTheme = () => {
  const theme = UseTheme();
  const { changeTheme } = useContext(ThemeContext)!;
  const themes = [
    "light",
    "pastel",
    "cmyk",
    "acid",
    "winter",
    "valentine",
    "synthwave",
    "forest",
    "business",
    "night",
    "dark",
    "black",
  ];
  return (
    <div className=" happy-card">
     <div>
     <h2 className=" happy-title-base">Application Theme</h2>
     <p>Application theme we provide change theme by click them and all application will change theme</p>
     </div>
      <div className=" mt-4 overflow-x-auto grid grid-cols-4 gap-2 w-full max-w-auto max-w-max ">
        {/* dark */}
        {themes.map((items) => {
          return (
            <div
              key={items}
              onClick={() => changeTheme(items)}
              data-theme={items}
              className="grid grid-cols-5 grid-rows-3 rounded-md max-w-28 cursor-pointer overflow-hidden"
            >
              <div className="bg-base-200 col-start-1 row-span-2 row-start-1"></div>{" "}
              <div className="bg-base-300 bottom-0 col-start-1 row-start-3"></div>{" "}
              <div className="bg-base-100 col-span-4 col-start-2 row-span-3 row-start-1 flex flex-col gap-1 p-2 relative">
                <div className="font-bold capitalize line-clamp-1">{items}</div>{" "}
                <div className="flex flex-wrap gap-1">
                  <div className="bg-primary flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                    <div className="text-primary-content text-sm font-bold">
                      A
                    </div>
                  </div>{" "}
                  <div className="bg-secondary flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                    <div className="text-secondary-content text-sm font-bold">
                      B
                    </div>
                  </div>{" "}
                  <div className="bg-accent flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                    <div className="text-accent-content text-sm font-bold">
                      C
                    </div>
                  </div>{" "}
                  <div className="bg-neutral flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                    <div className="text-neutral-content text-sm font-bold">
                      {items === `${theme}` ? (
                        <BsCheck2Circle size={20} />
                      ) : (
                        "D"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SettingTheme;
