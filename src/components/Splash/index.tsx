import React from 'react'
import './splash.css'

const Splash:React.FC = () => {
    const updates = [
      {
        id: 1,
        title: 'New Feature Added',
        content: 'We have added a new feature that allows users to save their favorite graphs and trees!',
        date: 'June 15, 2022'
      },
      {
        id: 2,
        title: 'Performance Improvements',
        content: 'We have optimized the performance of the visualizer to make it faster and smoother.',
        date: 'May 1, 2022'
      }
    ];
  
    const blogMessages = [
      {
        id: 1,
        title: 'Welcome to DSA Visualizer!',
        content: 'We are excited to launch our new application that makes it easy to visualize and learn about data structures and algorithms.',
        date: 'April 1, 2022'
      },
      {
        id: 2,
        title: 'Why Visualize DSA?',
        content: 'Visualization is a powerful tool for learning and understanding complex topics like data structures and algorithms. With our visualizer, you can see how different data structures work and how algorithms operate on them.',
        date: 'April 15, 2022'
      }
    ];
  
    const renderUpdates = () => {
      return updates.map(update => (
        <div key={update.id} className="update">
          <h3>{update.title}</h3>
          <p>{update.content}</p>
          <p>{update.date}</p>
        </div>
      ));
    };
  
    const renderBlogMessages = () => {
      return blogMessages.map(blogMessage => (
        <div key={blogMessage.id} className="blog-message">
          <h3>{blogMessage.title}</h3>
          <p>{blogMessage.content}</p>
          <p>{blogMessage.date}</p>
        </div>
      ));
    };
  
    return (
      <div className="splash-page">
        <div className="updates">
          <h2>Updates</h2>
          {renderUpdates()}
        </div>
        <div className="blog-messages">
          <h2>Blog</h2>
          {renderBlogMessages()}
        </div>
      </div>
    );
  };
  
  export default Splash;