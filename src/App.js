import React, { } from 'react';
import SceneComponent from './app/components/SceneComponent'; 
import MainRoomNavigation from './app/components/MainRoomNavigation';
import './App.scss';

function App() {
  return (
    <div className="main-layout">
        <SceneComponent className="scene" antialias id='my-canvas'>
          
        </SceneComponent> 
        <MainRoomNavigation className="navigation"/> 
    </div>
  )
}
export default App;
