import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/index'
import Graphs from './components/Graphs/index'
import NodePage from './components/generalComponents/NodePage';

const App: React.FC = () => {
  
  return (
    <div className="app">
      <NavBar/>
      <Routes>

        <Route path="/graphs" Component={Graphs}/>
        {/* <Route path="/trees" Component={()=><NodePage type={'trees'}/>}/>  
        <Route path="/linked_lists" Component={()=><NodePage type={'linkedlists'}/>}/>   */}
       
      </Routes>
    </div>
  );
}


export default App;
