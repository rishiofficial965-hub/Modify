import { getSong } from "../services/song.api";
import { useContext } from "react";
import { songContext } from "../song.context";
import { AuthContext } from "../../auth/auth.context";

export const useSong = () => {
  const context = useContext(songContext);
  const loadingContext = useContext(AuthContext);

  const { song, setSong } = context;
  const { loading, setLoading } = loadingContext;

  async function handleGetSong({ mood }) {
    try {
      setLoading(true);
      const data = await getSong({ mood });
      setSong(data.song);
    } catch (error) {
      console.error("Error fetching song:", error);
    } finally {
      setLoading(false);
    }
  }

  return { loading, song, handleGetSong };
};
