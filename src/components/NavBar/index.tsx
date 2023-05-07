import { NavLink } from 'react-router-dom';
import './navbar.css';
import github from '../../assets/github.png' ;
import linkedin from '../../assets/linkedin.png' ;



const NavBar = () => {
  return (
    <nav className="NavBar sb">
     <div className='my-links-holder'/>

      <ul>
        {/* <li>
          <NavLink to="/" className="activeLink">
            Home
          </NavLink>
        </li> */}
        <li>
          <NavLink to="/matricies" className="activeLink">
            Matricies
          </NavLink>
        </li>
        {/* <li>
          <NavLink to="/graphs" className="activeLink">
          Graphs
          </NavLink>
          </li>
          <li>
          <NavLink to="/trees" className="activeLink">
          Trees
          </NavLink>
        </li> */}
        {/* <li>
          <NavLink to="/linked_lists" className="activeLink">
          Linked Lists
          </NavLink>
        </li> */}
      </ul>
      <div className="sb my-links-holder">



                <a  href="https://www.github.com/mfong4151/"
                     target="_blank" 
                    className='a-link-spacing' 
                >
                    <img src={github} className='github-linkedin-header'/>
        </a>
        <a href="https://www.linkedin.com/in/mfong415/"
                  target="_blank" 
                  className='a-link-spacing' 
                  >
                    <img src={linkedin} className='github-linkedin-header'/>
                </a>
      </div>
    </nav>
    
  );
}
export default NavBar