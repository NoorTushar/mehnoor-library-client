import { Outlet } from "react-router";
function App() {
   return (
      <>
         <header>Click me</header>

         <Outlet />
         <footer></footer>
      </>
   );
}

export default App;
