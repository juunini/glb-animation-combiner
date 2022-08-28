import { useEffect } from 'react'
import { Group } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

const modelPath = '/public/models/scene.glb'
const animations = {
  Idle: '/public/animations/idle.glb',
  Walking: '/public/animations/walk.glb',
  WalkingBackwards: '/public/animations/walkBack.glb',
  LeftStrafeWalk: '/public/animations/walkLeft.glb',
  RightStrafeWalk: '/public/animations/walkRight.glb',
  Running: '/public/animations/run.glb',
  RunningBackward: '/public/animations/runBack.glb',
  LeftStrafe: '/public/animations/runLeft.glb',
  RightStrafe: '/public/animations/runRight.glb',
  Flying: '/public/animations/fly.glb'
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
