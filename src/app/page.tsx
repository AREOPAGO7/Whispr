
import Navbar from "./components/navigation/Navbar";
import Main from "./components/mainElements/Main";
import { Toaster } from 'react-hot-toast';

export default function Home() {


  return (
    <>
     <Toaster />
      <Navbar />
      <Main />
     
     
    </>
  );
}
