import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/index'
import Matricies from './components/Matricies/index'
import NodePage from './components/generalComponents/NodePage';
import Splash from './components/Splash';

const App: React.FC = () => {
  
  return (
    <div className="app">
      <NavBar/>
      <Routes>
        <Route path="/" Component={Splash}/>
        <Route path="/matricies" Component={Matricies}/>
        <Route path="/trees" Component={()=><NodePage type={'trees'}/>}/> 
        <Route path="/linked_lists" Component={()=><NodePage type={'linkedlists'}/>}/> 
       
      </Routes>
    </div>
  );
}


export default App;
