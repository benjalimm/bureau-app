import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, Scene, Engine, Mesh, PickingInfo, AssetsManager, SceneLoader, Color3, Color4, StandardMaterial, AbstractMesh, AnimationGroup, Skeleton, Animation, _BabylonLoaderRegistered } from '@babylonjs/core'

export default class MainGame {
box?: AbstractMesh;
camera?: FreeCamera;
scene?: Scene;
engine?: Engine;
assetsManager?: AssetsManager
groundYLevel: number = 1


public async initialize(scene: Scene, engine: Engine) {
  this.scene = scene
  this.engine = engine
  this.camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene)
  this.assetsManager = new AssetsManager(scene)
  engine.enableOfflineSupport = false;
  await this.prepareScene(scene)
  this.startRenderLoop(engine, scene)

  /// Highlight the ground wherever you hover 
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

private async prepareScene (scene: Scene) {
  if (scene.isReady()) {
    await this.onSceneReady(scene)
  } else {
    scene.onReadyObservable.addOnce(scene => this.onSceneReady(scene))
  }
}

private onRender (scene: Scene) {
  // if (this.box !== undefined) {
  //   var deltaTimeInMillis = scene.getEngine().getDeltaTime()

  //   const rpm = 10
  //   this.box.rotation.y += ((rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000))
  // }
}

private async onSceneReady (scene: Scene) {
  // This targets the camera to scene origin
  this.camera?.setTarget(Vector3.Zero())

  const canvas = scene.getEngine().getRenderingCanvas()

  // This attaches the camera to the canvas
  this.camera?.attachControl(canvas!, true)

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new HemisphericLight('light', new Vector3(0, 1, 0), scene)

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.4
  


  const environmentMaterial = new StandardMaterial("env", scene)
  environmentMaterial.diffuseColor = Color3.FromHexString("#FFF0D8")
  scene.ambientColor = Color3.FromHexString("#FFF0D8")
  scene.clearColor = new Color4(255/255, 240/255, 216/255, 1)

  // this.box.beginAnimation("Idle", true)
  this.box = MeshBuilder.CreateSphere("box", { diameter: 2 }, scene)
  this.box.position = new Vector3(10, 2, 20);
  const boxMaterial = new StandardMaterial("boxMaterial", scene)
  boxMaterial.diffuseColor = Color3.FromHexString("#FFA1A1")
  boxMaterial.emissiveColor = Color3.FromHexString("#FFA1A1")
  boxMaterial.specularColor = Color3.FromHexString("#FFA1A1")
  this.box.material = boxMaterial;


  // Our built-in 'ground' shape.
  MeshBuilder.CreateGround('ground', { width: 200, height: 200 }, scene)
  const ground = scene.getMeshByID("ground")
  const groundMaterial = new StandardMaterial("groundMat", scene)
  groundMaterial.diffuseColor = Color3.FromHexString("#FFA561")
  groundMaterial.emissiveColor = Color3.FromHexString("#FFA561")
  groundMaterial.specularColor = Color3.FromHexString("#FFA561")

  ground!.material = groundMaterial

  SceneLoader.ImportMesh("", "/assets/", "CoffeeTable.babylon", this.scene!, (meshes) => {
    console.log("Loaded meshes")
    meshes[0].position = Vector3.Zero()
    meshes[0].position.y = 1

    var myMaterial = new StandardMaterial("myMaterial", scene);
    
    myMaterial.diffuseColor = Color3.FromHexString("FFF0D8")
    myMaterial.specularColor = Color3.FromHexString("FFF0D8")
    // myMaterial.emissiveColor = Color3.Blue()
    myMaterial.ambientColor = Color3.Red()
    
    
    
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
      const pickedPoint = pickResult!.pickedPoint!
      //   this.box!.position.x = pickResult!.pickedPoint!.x
      //   this.box!.position.z = pickResult!.pickedPoint!.z
        this.walk(pickedPoint)
    }
  }

  private walk(toVector: Vector3) {

    // 1. Get current location
    // const currentXPosition = this.box!.position.x;
    // const currentZPosition = this.box!.position.z;

    // // 2. Calculate distance 
    // const xDistance = Math.abs(currentXPosition - toVector.x!)
    // const zDistance = Math.abs(currentZPosition - toVector.z!)

    // var x = 0
    // var z = 0

    // const speedPerFrame = 0.05
    // this.scene!.registerAfterRender(() => {

    //   // this.box!.position.x += -speedPerFrame
    //   this.box!.position.z += speedPerFrame
    // })

    this.box!.position.x = toVector.x
    this.box!.position.z = toVector.z

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

  public async setObjectOnGround(rootUrl: string, name: string, xPosition: number, zPosition: number, onProgress: ((percentage: number) => void) | null): Promise<AbstractMesh> {
    return new Promise((resolve, reject) => {
      SceneLoader.ImportMesh("", rootUrl, name, this.scene!, (meshes, particleSystem,skeleton, animationGroups) => {
        
        const mesh = meshes[0]
        mesh.position = new Vector3(xPosition, this.groundYLevel, zPosition)
        this.mergeSkeletonAnimationsWithMesh(mesh, skeleton[0]);
        resolve(mesh)
      },(progressEvent) => {
        if (onProgress !== null) {
          onProgress!(progressEvent.loaded / progressEvent.total)
        }
      }, (_, message, error) => {
        console.log(`Error with setting object on ground: ${message}`)
        reject(error)
      })
    })
  }


  private async mergeSkeletonAnimationsWithMesh(
    mesh: AbstractMesh, 
    skeleton: Skeleton
    ) {
      const range = skeleton.getAnimationRanges()
      range.forEach(animationRange => {
        if (animationRange) {
          mesh.createAnimationRange(animationRange!.name, animationRange!.from, animationRange!.to)
        } 
      })
  }


} 
