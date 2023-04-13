import { NavLink } from 'react-router-dom';
import './navbar.css';

const NavBar = () => {
  return (
    <nav className="NavBar">
      <ul>
        <li>
          <NavLink to="/" className="activeLink">
            Home
          </NavLink>
        </li>
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
    </nav>
  );
}
export default NavBar