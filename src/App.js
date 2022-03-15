import axios from 'axios';
import { useState, useEffect } from 'react';
import DesktopDivider from './components/DesktopDivider';
import Dice from './components/Dice';

function App() {
  const [advice,setAdvice] = useState('');

  const [randomId,setRandomId] = useState(1);
  
  const generateId = () => setRandomId(Math.floor(Math.random() * 200));


  useEffect(() => {
    const abortCont = new AbortController();
    axios.get(`https://api.adviceslip.com/advice/${randomId}`)
    .then((data) => {
      setAdvice(data.data.slip)
    })
    .catch((err) => {
      console.log(err);
    })
  
    return () => abortCont.abort();
  },[advice])

  return (
   <div className="md:lightbox lightbox-mobile w-4/5 md:w-auto md:m-0 h-72 md:h-auto rounded-xl p-10 relative shadow-2xl flex flex-col justify-center">
      <h1 className="tracking-widest advice-title text-center text-sm font-medium">ADVICE #{advice.id}</h1>
      <div className="flex justify-center items-center w-80 self-center py-5">
        <p className="font-semibold text-center advice">"{advice.advice}"</p>
      </div>
      {/* Divider */}
      <div className="md:hidden w-full border-b border-gray-500 flex justify-center text-gray-300 font-bold text-xl relative">
        <span className="absolute -top-4 lightbox-mobile">|  |</span>
      </div>
      <div className="flex justify-center">
        <DesktopDivider />
      </div>
      <div className="absolute -bottom-5 left-0 w-full flex justify-center">
        <Dice generateId={generateId} />
      </div>
   </div>
  );
}

export default App;
