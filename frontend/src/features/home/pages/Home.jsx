import Nav from "../../auth/components/Nav";
import FaceExpression from "../../expression/components/FaceExpression";
import Player from "../components/Player";

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
      <Nav />
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center w-full px-4 pt-32 pb-24 z-10 gap-8">
        
        <div className="bg-[#121212] border border-gray-800 rounded-3xl p-10 flex flex-col items-center gap-6 w-[550px] shadow-lg">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">
              Discover Music by <span className="text-[#1DB954]">Mood</span>
            </h1>
            <p className="text-gray-400 text-sm">
              Let the model analyze your expression to find the perfect song.
            </p>
          </div>

          <div className="w-full flex justify-center rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(29,185,84,0.1)] ring-1 ring-gray-800">
            <FaceExpression />
          </div>
        </div>

      </main>

      <Player />
    </div>
  );
};

export default Home;
