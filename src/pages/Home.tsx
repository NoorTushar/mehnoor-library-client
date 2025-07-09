import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const Home = () => {
   return (
      <section className="max-w-[1200px] flex justify-center items-center flex-col mx-auto px-6         min-h-[calc(100vh-68px)] pt-6 gap-4">
         <h3 className="text-primary uppercase text-xl tracking-widest text-center">
            WELCOME TO
         </h3>
         <h2 className="text-4xl uppercase tracking-widest text-center">
            MEHNOOR LIBRARY
         </h2>
         <Button className="">
            <Link to={"/books"}>View Books</Link>
         </Button>
      </section>
   );
};

export default Home;
