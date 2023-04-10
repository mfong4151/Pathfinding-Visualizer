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
        <Route path="/matricies" Component={Matricies}/>
        <Route path="/trees" Component={()=><Nodular type={'trees'}/>}/> 
        <Route path="/linked_lists" Component={()=><Nodular type={'linkedlists'}/>}/> 
        <Route path="/" Component={Splash}/>
        <Route path="" Component={Splash}/>
       
      </Routes>
    </div>
  );
}


export default App;
