import React from 'react'
import './splash.css'

const aboutThisProject: string =  ''

const Splash:React.FC = () => {
 
    
  
    return (
      <div className="splash-page fdr">
        <section id="updates" className="splash-section">
          <h2>Updates</h2>
            <RenderUpdates/>
          <h2>Timeline</h2>
            <RenderTimeline/>
        </section>
        <section id="blog-messages" className="splash-section">
          <h1>About this Project</h1>
        </section>
      </div>
    );
  };

  export default Splash;



const RenderUpdates: React.FC = () => {
  return (
    <div>
      
    </div>
  )
}

const RenderTimeline: React.FC = () => {
  return (
    <div>
      
    </div>
  )
}

