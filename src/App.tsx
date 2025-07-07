import { Outlet } from "react-router";
import { ModeToggle } from "./components/ModeToggle";
function App() {
   return (
      <>
         <header>
            Click me
            <ModeToggle />
         </header>

         <Outlet />
         <footer></footer>
      </>
   );
}

export default App;
