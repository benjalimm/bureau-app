import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, Scene, Engine, Mesh } from '@babylonjs/core';

export default class MainGame {
box?: Mesh;
camera: FreeCamera;
scene: Scene;
engine: Engine;
reactCanvas:HTMLCanvasElement | WebGLRenderingContext;

  constructor(reactCanvas:HTMLCanvasElement | WebGLRenderingContext) {
    this.reactCanvas = reactCanvas
    this.engine = new Engine(reactCanvas, false, {}, true)
    this.scene = new Scene(this.engine, {})
    this.camera = new FreeCamera("camera1", new Vector3(0, 5, -10), this.scene);
    this.init()
  }

  private init() {
    if (this.scene.isReady()) {
      this.onSceneReady(this.scene)
  } else {
      this.scene.onReadyObservable.addOnce(scene => this.onSceneReady(scene));
  }

    this.engine.runRenderLoop(() => {
      this.scene.render();
    })


  }

  
  public onRender(scene: Scene) {
    if (this.box !== undefined) {
      var deltaTimeInMillis = scene.getEngine().getDeltaTime();
  
      const rpm = 10;
      this.box.rotation.y += ((rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000));
    }
  }

  public onSceneReady(scene: Scene) {
    // This creates and positions a free camera (non-mesh)
    

    // This targets the camera to scene origin
    this.camera.setTarget(Vector3.Zero());

    const canvas = scene.getEngine().getRenderingCanvas();

    // This attaches the camera to the canvas
    this.camera.attachControl(canvas!, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Our built-in 'box' shape.
    let box = MeshBuilder.CreateBox("box", {size: 2}, this.scene)    // Move the box upward 1/2 its height
    box.position.y = 1;

    // Our built-in 'ground' shape.
    MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);
  }


}