import { Poppins } from 'next/font/google';


const poppins = Poppins({
  subsets: ['latin'],
  weight: '600',
});

export default function loading(){
    return <h1
    className={`flex justify-center items-center h-screen w-full text-[26px] lg:text-[40px] ${poppins.className} bg-[#1c1c1c] text-white`}
  >
    
  </h1>
}