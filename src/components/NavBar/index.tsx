import React, {MouseEvent} from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import github from '../../assets/github.png' ;
import linkedin from '../../assets/linkedin.png' ;


const handleOnClick = (e: MouseEvent<HTMLDivElement> ) => {
  e.preventDefault();
  e.stopPropagation();

  navigator.clipboard.writeText('mfong415@gmail.com');
  alert(`Email copied to clipboard: mfong415@gmail.com`);
};

const NavBar = () => {
  return (
    <nav className="navbar sb fdc-mobile">
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



        <a  href="https://www.github.com/mfong4151/" target="_blank"  className='a-link-spacing' >
          <img src={github} className='github-linkedin-header'/>
        </a>
        <a href="https://www.linkedin.com/in/mfong415/"target="_blank" className='a-link-spacing' >
           <img src={linkedin} className='github-linkedin-header'/>
        </a>
        <div id='contact-me' className='udc pointer-events' onClick={handleOnClick} > Contact me</div>

      </div>
    </nav>
    
  );
}
export default NavBar