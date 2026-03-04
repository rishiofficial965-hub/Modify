import { useState } from "react";
import { songContext } from "./song.context";
import Loader from "../auth/components/Loading";

export const SongContextProvider = ({ children }) => {
  const [song, setSong] = useState({});

  return (
    <songContext.Provider value={{ song, setSong }}>
      {children}
    </songContext.Provider>
  );
};