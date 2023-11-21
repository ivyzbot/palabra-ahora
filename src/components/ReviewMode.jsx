import { useContext } from "react";
import { Context } from "../pages/ReviewPage";

export default function ReviewMode() {
  const contextData = useContext(Context);

  return (
    <>
      <div className="flex justify-center justify-items-center mt-10">
        <p className="text-lg mr-4 ">Language Mode</p>
        <label className="swap text-primary border-2 rounded-lg hover:bg-accent hover:text-secondary-content">
          <input
            type="checkbox"
            onClick={() => {
              contextData.language === "EN"
                ? contextData.setLanguage("SP")
                : contextData.setLanguage("EN");
            }}
          />
          <div className="swap-on px-2 font-bold">SP</div>
          <div className="swap-off px-2 font-bold">EN</div>
        </label>
      </div>
    </>
  );
}
