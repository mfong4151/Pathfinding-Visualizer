import React from 'react'
import './splash.css'
import bfsBi from '../../assets/bfsbi.gif' 
import { NavLink } from 'react-router-dom';

const Splash:React.FC = () => {
 
    
  
    return (
      <div className="splash-page udc fdr">

        <section id="blog-messages" className="splash-section">
          <h1>About this Project</h1>
          <p>
            This project started off as a side project to help me learn typescript, 
            but gradually became a general tool to help explain the way DSA works. 
            I've personally felt that visual aids are always a helpful way to solidify my understanding of what's going on.


          </p>

          <p>
           Much inspiration was taken from the   tutorial by Clement Milhaesque, but I've added my own touches and tools to maintain the wow factor as well as keep it a valuable tool for computer programming students:
          </p>

          <ul>
            <li>First, you'll notice that the start and stop icons are drag and droppable. I just thought this was a nice touch.</li>
            <li>Second, with each of these algorithms comes a brief explaination of how they work, what they do, in plain English.
              I'm aware that these aren't the most "erudite" explainations, but the whole idea was to keep it accessible.

            </li>
            <li>
                Third, I added the ability to play the algorithms step by step, to see how things play out in slow motion, I thought this was a nice touch, 
                and this is where the majority of the challenge came through. I'll admit, if you look at the source code there are decisions I could have made which could make the code base more followable, 
                but I guess whenever you decide to engage with OOP you live and die by your design decisions. 

            </li>


          </ul>

          <p>Here's an image of some of an example graphics that I produced:</p>
          <div className='udc'>
            <img id='bfs-bi' src={bfsBi} alt="A gif of bidirectional BFS" />

          </div>

          <p>
            The project was done in Typescript-React. This was an honestly odd choice, as I didn't benefit from the static typing too much. However, it helped me learn how things were done in the setting of large scaleable systems, so there are no regrets overall.

          </p>
          <NavLink className='to-mat' to='/matricies'>
                Go take a look
           </NavLink>
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