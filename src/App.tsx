import React, {useRef} from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/index'
import Matricies from './components/Matricies/index'
import Footer from './components/Footer';
import Splash from './components/Splash';

const App: React.FC = () => {

  const footerRef = useRef<null |HTMLDivElement>(null)
  
  return (
    <div className="app">
      <NavBar footerRef={footerRef}/>

      <Routes>
        <Route path="/" element={<Splash/>}/>
        <Route path="/matrices" element={<Matricies/>}/>
        <Route path="*" element={<Splash/>}/>
      </Routes>

      <div ref={footerRef}> <Footer/></div>
    </div>
  );
}


export default App;
