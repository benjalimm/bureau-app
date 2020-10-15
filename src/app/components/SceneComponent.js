import { Engine, Scene, MeshBuilder } from '@babylonjs/core'
import React, { useEffect, useRef } from 'react'
import shared from '../../shared'
export default (props) => {
    const reactCanvas = useRef(null);
    const { antialias, engineOptions, adaptToDeviceRatio, sceneOptions, ...rest } = props;
    const { game } = shared
    
    useEffect(() => {
        if (reactCanvas.current) {

            const engine = new Engine(reactCanvas.current, antialias, engineOptions, adaptToDeviceRatio);
            const scene = new Scene(engine, sceneOptions);
            game.initialize(scene, engine)
          
            if (window) {
              // -- WINDOW LISTENERS 
              window.addEventListener('resize', () => {
                game.onResize(scene)
              });

              window.addEventListener("click", () => {
                game.onClick(scene)
              })
            }

            return () => {
                scene.getEngine().dispose();
            }
        }
    }, [adaptToDeviceRatio, antialias, engineOptions, game, props, reactCanvas, sceneOptions])

    return (
        <canvas ref={reactCanvas} {...rest} />
    );
}