import React from 'react'
import './splash.css'

const aboutThisProject: string =  "This project started off as a side project to help me learn typescript, but gradually became a \
                                    a general tool to help explain the way DSA works. I've personally felt that visual aids are always\
                                    a helpful way to solidify my understanding of whats going on. Much inspiration was taken from the\
                                    tutorial by Clement Milhaesque, but I've added my own touches and tools to maintain the wow factor\
                                    as well as keep it a valuable tool for computer programming students."

const Splash:React.FC = () => {
 
    
  
    return (
      <div className="splash-page udc fdr">

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
      {updates.map((update:string, idx:number) =>
          <div key={idx}>
            <h3>{`${update.split(':')[0]}:`} </h3>
            <p className='update text'>{`${update.split(':')[1]}`}</p>
          </div>
      )}
    </div>
  )
}

const RenderTimeline: React.FC = () => {
  return (
    <div id='timeline-block'>
        {timelines.map((status:string, idx:number) =>
          <div className='fdc' key={idx}>
            <h3>{`${status.split(':')[0]}:`} </h3>
            <p >{`${status.split(':')[1]}`}</p>
          </div>
      )}
    </div>
  )
}





const timelines:string[] = [

  "4/14 Add A* and other matrix search algorithims: Pretty straight forward, want to get more algos up.",
  "4/17 Add tree algorithim iterators: BFS, and DFS inorder, postorder, preorder",
  "4/24: Add graph: Back to graphs! I’ll be adding node versions for these as well.",
  "4/31: Add any styling touchup",

];

const updates: string[] = [
  "4/14/23: Basic MVP implemented. Check out the project!"

];