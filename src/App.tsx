import { Routes, Route } from 'react-router-dom';
import Nodular from './components/Nodulars';
import NavBar from './components/NavBar/index'
import Matricies from './components/Matricies/index'

import Splash from './components/Splash';

const App: React.FC = () => {
  
  return (
    <div className="app">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Splash/>}/>
        <Route path="/matricies" element={<Matricies/>}/>
        <Route path="/trees" element={<Nodular type={'trees'}/>}/> 
        <Route path="/linked_lists" element={<Nodular type={'linkedlists'}/>}/> 
        <Route path="*" element={<Splash/>}/>
       
      </Routes>
    </div>
  );
}


export default App;
