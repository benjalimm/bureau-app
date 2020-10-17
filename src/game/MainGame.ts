import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, Scene, Engine, Mesh, PickingInfo, AssetsManager, SceneLoader } from '@babylonjs/core'

export default class MainGame {
box?: Mesh;
camera?: FreeCamera;
scene?: Scene;
engine?: Engine;
assetsManager?: AssetsManager

public initialize (scene: Scene, engine: Engine) {
  this.scene = scene
  this.engine = engine
  this.camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene)
  this.assetsManager = new AssetsManager(scene)
  engine.enableOfflineSupport = false;
  this.prepareScene(scene)
  this.startRenderLoop(engine, scene)
  this.onPointHover(scene, (pickResult) => {
    if (pickResult?.pickedPoint) {
      this.drawCicleAtPoint(pickResult!.pickedPoint!)
    }
  })
}

private startRenderLoop (engine: Engine, scene: Scene) {
  engine.runRenderLoop(() => {
    this.onRender(scene)
    scene.render()
  })
}

private prepareScene (scene: Scene) {
  if (scene.isReady()) {
    this.onSceneReady(scene)
  } else {
    scene.onReadyObservable.addOnce(scene => this.onSceneReady(scene))
  }
}

private onRender (scene: Scene) {
  if (this.box !== undefined) {
    var deltaTimeInMillis = scene.getEngine().getDeltaTime()

    const rpm = 10
    this.box.rotation.y += ((rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000))
  }
}

private onSceneReady (scene: Scene) {
  // This creates and positions a free camera (non-mesh)

  // This targets the camera to scene origin
  this.camera?.setTarget(Vector3.Zero())

  const canvas = scene.getEngine().getRenderingCanvas()

  // This attaches the camera to the canvas
  this.camera?.attachControl(canvas!, true)

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new HemisphericLight('light', new Vector3(0, 1, 0), scene)

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7

  // Our built-in 'box' shape.
  const box = MeshBuilder.CreateBox('box', { size: 2 }, this.scene) // Move the box upward 1/2 its height
  box.position.y = 1

  // Our built-in 'ground' shape.
  MeshBuilder.CreateGround('ground', { width: 200, height: 200 }, scene)

  // const coffeeTable = this.assetsManager!.addMeshTask('coffeeTable', 'CoffeeTable.babylon', '../../assets/', 'CoffeeTable.babylon')

  // coffeeTable.onSuccess = (task) => {
  //   console.log("coffee table has been loaded ")
  //   task.loadedMeshes[0].position = Vector3.Zero()
  // }

  // coffeeTable.onError = (task, message, err) => {
  //   console.log("Failed to load coffee table")
  //   console.log(err)
  // }
  SceneLoader.ImportMesh("", "/assets/", "CoffeeTable.babylon", this.scene!, (meshes) => {
    console.log("Loaded meshes")
    meshes[0].position = Vector3.Zero()
    meshes[0].position.y = 1
  }, (progress) => {

  }, (scene, message, error) => {
    console.log("failed to load mesh")
    console.log(message)
    console.log(error)
  })

  // SceneLoader.Load("/assets/", "CoffeeTable.obj", this.engine!)
  
}

public onResize (scene: Scene) {
  scene.getEngine().resize()
}

public onClick (scene: Scene) {
  const pickResult = scene.pick(scene.pointerX, scene.pointerY)
  console.log(pickResult)

  if (pickResult?.pickedPoint) {
    const box1 = scene.getMeshByName('box')
      box1!.position.x = pickResult!.pickedPoint!.x
      box1!.position.z = pickResult!.pickedPoint!.z
  }
}

private onPointHover (scene: Scene, onHover: (result: PickingInfo | null) => (void)) {
  setInterval(() => {
    const pickResult = scene.pick(scene.pointerX, scene.pointerY)
    if (pickResult) {
      onHover(pickResult)
    } else {
      onHover(null)
    }
  }, 10)
}

private drawCicleAtPoint (point: Vector3) {
  const radius = 1
  var lines = MeshBuilder.CreateDashedLines('lines', {
    points: [
      new Vector3(point.x - radius, 0, point.z + radius),
      new Vector3(point.x + radius, 0, point.z + radius),
      new Vector3(point.x + radius, 0, point.z - radius),
      new Vector3(point.x - radius, 0, point.z - radius),
      new Vector3(point.x - radius, 0, point.z + radius)
    ]

  })
  setTimeout(() => {
    lines.dispose()
  }, 10)
}
}
