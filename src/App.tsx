import { useEffect } from 'react'
import { Group } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

const modelPath = '/models/scene.glb'
const animations = {
  Idle: '/animations/idle.glb',
  Walking: '/animations/walk.glb',
  WalkingBackwards: '/animations/walkBack.glb',
  LeftStrafeWalk: '/animations/walkLeft.glb',
  RightStrafeWalk: '/animations/walkRight.glb',
  Running: '/animations/run.glb',
  RunningBackward: '/animations/runBack.glb',
  LeftStrafe: '/animations/runLeft.glb',
  RightStrafe: '/animations/runRight.glb',
  Flying: '/animations/fly.glb'
}
const gltfName = 'Armature'

export default function App (): JSX.Element {
  useEffect(() => {
    combineAnimations().catch(console.error)
  }, [])

  return (
    <div>loading</div>
  )
}

async function combineAnimations (): Promise<void> {
  const gltfLoader = new GLTFLoader()
  const gltfExporter = new GLTFExporter()
  const group = new Group()

  group.name = gltfName

  const gltf = await asyncGltfLoad(gltfLoader, modelPath)
  group.add(gltf.scene)

  await loadAnimations(group, animations)

  gltfExporter.parse(
    gltf.scene,
    (glb) => download(glb as ArrayBuffer, 'scene.glb'),
    console.error,
    { binary: true, animations: group.animations }
  )
}

async function loadAnimations (group: Group, animations: Object): Promise<void> {
  const gltfLoader = new GLTFLoader()

  for (const [name, path] of Object.entries(animations)) {
    const gltf = await asyncGltfLoad(gltfLoader, path)

    gltf.animations[0].name = name
    group.animations.push(gltf.animations[0])
  }
}

function download (arrayBuffer: ArrayBuffer, fileName: string): void {
  const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  a.click()
}

async function asyncGltfLoad (gltfLoader: GLTFLoader, path: string): Promise<GLTF> {
  return await new Promise((resolve, reject) => {
    gltfLoader.load(path, resolve, undefined, reject)
  })
}
