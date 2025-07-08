import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
function App() {
   return (
      <>
         <header>
            <Navbar />
         </header>

         <Outlet />
         <footer></footer>
      </>
   );
}

export default App;
