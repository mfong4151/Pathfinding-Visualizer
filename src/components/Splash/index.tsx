import React from 'react'
import './splash.css'

const Splash:React.FC = () => {
 
    
  
    return (
      <div className="splash-page fdr">
        <section id="updates" className="splash-section">
          <h2>Updates</h2>
          {RenderUpdates()}
        </section>
        <div id='separator'/>
        <section id="blog-messages" className="splash-section">
          <h2>Blog</h2>
          {RenderTimeline()}
        </section>
      </div>
    );
  };

  export default Splash;



const RenderUpdates = () => {
  return (
    <div>
      
    </div>
  )
}

const RenderTimeline = () => {
  return (
    <div>
      
    </div>
  )
}

