import React from 'react'
import './splash.css'

const aboutThisProject: string =  "This project started off as a side project to help me learn typescript, but gradually became a \
                                    a general tool to help explain the way DSA works. I've personally felt that visual aids are always\
                                    a helpful way to solidify my understanding of whats going on. Much inspiration was taken from the\
                                    tutorial by Clement Milhaesque, but I've added my own touches and tools to maintain the wow factor\
                                    as well as keep it a valuable tool for computer programming students."

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
          <p>{aboutThisProject}</p>
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

