
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/index'
import Graphs from './components/Graphs/index'
import Trees from './components/Graphs/index'
import LinkedLists from './components/Graphs/index'

const App: React.FC = () => {
  
  return (
    <div className="app">
      <NavBar/>
      <Routes>
        <Route path="/graphs" Component={Graphs}/>
        <Route path="/trees" Component={Trees}/>  
        <Route path="/linked-lists" Component={LinkedLists}/>  
      </Routes>
    </div>
  );
}


export default App;
