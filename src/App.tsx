import React, {useRef} from 'react';
import { Routes, Route } from 'react-router-dom';
import Nodular from './components/Nodulars';
import NavBar from './components/NavBar/index'
import Matricies from './components/Matricies/index'
import VisFooter from './components/VisFooter';
import Splash from './components/Splash';

const App: React.FC = () => {

  const footerRef = useRef<null |HTMLDivElement>(null)
  
  return (
    <div className="app">
      <NavBar footerRef={footerRef}/>

      <Routes>
        <Route path="/" element={<Splash/>}/>
        <Route path="/matricies" element={<Matricies/>}/>
        <Route path="*" element={<Splash/>}/>
        
      </Routes>
      <div ref={footerRef}>
        <VisFooter/>

      </div>
    </div>
  );
}


export default App;
