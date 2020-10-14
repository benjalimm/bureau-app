import React, { useRef } from 'react';
import SceneComponent from './app/components/SceneComponent'; 
import MainRoomNavigation from './app/components/MainRoomNavigation';
import './App.scss';




/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */


function App() {
  return (
    <div className="main-layout">
      <SceneComponent className="scene" antialias id='my-canvas' />
      <MainRoomNavigation className="navigation"/>
    </div>
  )
}
export default App;
