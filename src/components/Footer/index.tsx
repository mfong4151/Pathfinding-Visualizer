import React, { FC, MouseEvent} from 'react'
import './Footer.css'
import qrCode from '../../assets/frame.png'
import github from '../../assets/github.png' ;
import linkedin from '../../assets/linkedin.png' ;


const Footer:FC = () => {

  const handleOnClick = (e: MouseEvent<HTMLParagraphElement> ) => {
    e.preventDefault();
    e.stopPropagation();
  
    navigator.clipboard.writeText('mfong415@gmail.com');
    alert(`Email copied to clipboard: mfong415@gmail.com`);
  };

  return (
    <footer id='vis-footer' className="fdc">
        <div className='udc'>
          <hr/>
        </div>
        <div id="contacts" className='se'>

          <img id='my-qr' src={qrCode} alt="qr code to my site"/>
          <div>

            <p id='my-email' onClick={handleOnClick} className='pointer-events'>Email Me</p>
            <div className='se'>
              <a  href="https://www.github.com/mfong4151/" target="_blank" >
                  <img src={github} className='github-linkedin-header'/>
              </a>
              <a href="https://www.linkedin.com/in/mfong415/"target="_blank" >
                <img src={linkedin} className='github-linkedin-header'/>
              </a>

            </div>
          </div>
        </div>

    </footer>
  )
}

export default Footer;
