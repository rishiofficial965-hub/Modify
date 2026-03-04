import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import { AuthProvider } from "./features/auth/auth.provider";
import { SongContextProvider } from "./features/home/song.provider";
router;

const App = () => {
  return (
    <SongContextProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </SongContextProvider>
  );
};

export default App;
