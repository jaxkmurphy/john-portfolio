import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const parts = ['Head', 'Chest_Peasant_02', 'Pants', 'Boots_Peasant', 'Bracers', 'Hands']

function disposeObject(root: THREE.Object3D) {
  root.traverse(object => {
    if (!(object instanceof THREE.Mesh)) return
    object.geometry.dispose()
    const materials = Array.isArray(object.material) ? object.material : [object.material]
    for (const material of materials) {
      for (const value of Object.values(material)) if (value instanceof THREE.Texture) value.dispose()
      material.dispose()
    }
    if (object instanceof THREE.SkinnedMesh) object.skeleton.dispose()
  })
}

export default function AscendCharacter({ skin, body, hair, hairColour, eye, face, beard, beardColour }: { skin: string; body: string; hair: string; hairColour: string; eye: string; face: string; beard: string; beardColour: string }) {
  const updateAppearance = useRef<(hair: string, colour: string, eye: string, face: string, beard: string, beardColour: string, body: string, skin: string) => void>(() => {})
  const host = useRef<HTMLDivElement>(null)
  const actions = useRef({ rotate: (_direction: number) => {}, zoom: (_factor: number) => {}, reset: () => {} })
  const [status, setStatus] = useState('Loading character…')
  const [failed, setFailed] = useState(false)
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    const container = host.current!
    let stopped = false
    let renderer: THREE.WebGLRenderer
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }) }
    catch { queueMicrotask(() => { if (!stopped) { setFailed(true); setStatus('3D rendering is unavailable in this browser.') } }); return () => { stopped = true } }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    container.appendChild(renderer.domElement)
    renderer.domElement.setAttribute('aria-label', 'Ascend character. Drag to rotate, scroll or pinch to zoom. Alternative controls below.')
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#596775')
    const camera = new THREE.PerspectiveCamera(35, 1, 0.01, 100)
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enablePan = false
    controls.minDistance = 1.5
    controls.maxDistance = 7
    controls.maxPolarAngle = Math.PI * 0.85
    const character = new THREE.Group()
    scene.add(character)
    scene.add(new THREE.HemisphereLight(0xe2efff, 0x61503a, 2.5))
    const key = new THREE.DirectionalLight(0xffead1, 3)
    key.position.set(3, 4, 5)
    scene.add(key)
    const rim = new THREE.DirectionalLight(0xa5c7ff, 2)
    rim.position.set(-3, 2, -2)
    scene.add(rim)
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.88, 0.12, 64), new THREE.MeshStandardMaterial({ color: 0x51483a, roughness: 0.9 }))
    base.position.y = -0.06
    scene.add(base)
    const render = () => { if (!stopped) renderer.render(scene, camera) }
    const reset = () => { character.rotation.y = 0; camera.position.set(0, 1.15, 3.2); controls.target.set(0, 1, 0); controls.update(); render() }
    reset()
    actions.current = {
      rotate: direction => { character.rotation.y += direction * Math.PI / 8; render() },
      zoom: factor => { const offset = camera.position.clone().sub(controls.target); offset.setLength(THREE.MathUtils.clamp(offset.length() * factor, controls.minDistance, controls.maxDistance)); camera.position.copy(controls.target).add(offset); controls.update(); render() },
      reset,
    }
    controls.addEventListener('change', render)
    const resize = new ResizeObserver(() => {
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight, false)
      render()
    })
    resize.observe(container)
    const loader = new GLTFLoader()
    const cache = new Map<string, Promise<THREE.Group>>()
    const originals = new Map<THREE.Mesh, THREE.Material | THREE.Material[]>()
    const owned = new THREE.Group()
    let revision = 0
    let framed = false
    let activeParts: THREE.Group[] = []
    const load = (file: string) => {
      const cached = cache.get(file)
      if (cached) return cached
      const pending = loader.loadAsync(`${import.meta.env.BASE_URL}models/ascend/${file}.glb`).then(gltf => {
        if (stopped) { disposeObject(gltf.scene); throw new Error('Viewer closed') }
        gltf.scene.traverse(object => {
          if (object instanceof THREE.Mesh) originals.set(object, object.material)
        })
        owned.add(gltf.scene)
        return gltf.scene
      }).catch(error => { cache.delete(file); throw error })
      cache.set(file, pending)
      return pending
    }
    updateAppearance.current = async (selectedHair, colour, selectedEye, selectedFace, selectedBeard, selectedBeardColour, selectedBody, selectedSkin) => {
      const current = ++revision
      setStatus(framed ? 'Updating appearance…' : 'Loading character…')
      const sex = selectedBody === 'f' ? 'F' : 'M'
      const materialFiles: Record<string, string> = {
        [`MI_Hu_${sex}_Body_Preview`]: `MI_Hu_${sex}_Skin_${selectedSkin}`,
        [`MI_Hu_${sex}_Head_Preview`]: `MI_Hu_${sex}_Head_${selectedFace}_A`,
        [`MI_Hu_${sex}_Head_01_A`]: `MI_Hu_${sex}_Head_${selectedFace}_A`,
        M_2sidedLit: `MI_HU_Eye_${selectedEye}`,
        MI_Set_Peasant_Bl: 'MI_Set_Peasant_Br',
      }
      if (selectedBeard && selectedBeardColour !== 'Bd') materialFiles.MI_Hu_M_Facials_Bd = `MI_Hu_M_Facials_${selectedBeardColour}`
      const family = (selectedBody === 'm' ? selectedHair === '09' : selectedHair === '07') ? '02' : '01'
      if (colour !== 'Bd') materialFiles[`MI_HU_Hair_${family}_Bd`] = `MI_HU_Hair_${family}_${colour}`
      try {
        const [meshes, materials] = await Promise.all([
          Promise.all([...parts, `Hair_${selectedHair}`, ...(selectedBeard ? [`Beard_${selectedBeard}`] : [])].map(part => load(`SK_Hu_${sex}_${part}`))),
          Promise.all(Object.entries(materialFiles).map(async ([original, file]) => {
            const root = await load(file)
            let result: THREE.Material | undefined
            root.traverse(object => {
              if (object instanceof THREE.Mesh) result = Array.isArray(object.material) ? object.material[0] : object.material
            })
            if (!result) throw new Error('Material missing')
            return [original, result] as const
          })),
        ])
        // A slower, older selection must never replace the user's latest choice.
        if (stopped || current !== revision) return
        const replacements = new Map(materials)
        meshes.forEach(root => root.traverse(object => {
          if (!(object instanceof THREE.Mesh)) return
          const original = originals.get(object)!
          const replace = (material: THREE.Material) => replacements.get(material.name) ?? material
          object.material = Array.isArray(original) ? original.map(replace) : replace(original)
        }))
        activeParts.forEach(root => owned.add(root))
        meshes.forEach(root => character.add(root))
        activeParts = meshes
        if (!framed) {
          const bounds = new THREE.Box3().setFromObject(character)
          const size = bounds.getSize(new THREE.Vector3())
          const center = bounds.getCenter(new THREE.Vector3())
          const scale = 2 / size.y
          character.scale.setScalar(scale)
          character.position.set(-center.x * scale, -bounds.min.y * scale, -center.z * scale)
          framed = true
        }
        setFailed(false)
        setStatus('Character loaded. Drag to rotate or use the controls below.')
        render()
      } catch {
        if (stopped || current !== revision) return
        setFailed(true)
        setStatus('Could not load that appearance. Your previous character is still visible. Try again.')
      }
    }
    return () => {
      stopped = true
      resize.disconnect()
      controls.dispose()
      // Restore originals before releasing cached assets and material previews.
      originals.forEach((material, mesh) => { mesh.material = material })
      disposeObject(scene)
      disposeObject(owned)
      updateAppearance.current = () => {}
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])
  useEffect(() => {
    updateAppearance.current(hair, hairColour, eye, face, beard, beardColour, body, skin)
  }, [hair, hairColour, eye, face, beard, beardColour, body, skin, attempt])
  return <div className="ascend-model">
    <div className="ascend-model-canvas" ref={host} />
    <p role="status">{status}</p>
    {failed ? <button type="button" onClick={() => { setFailed(false); setStatus('Loading character…'); setAttempt(value => value + 1) }}>Retry preview</button> : <div className="ascend-model-controls">
      <button type="button" onClick={() => actions.current.rotate(-1)}>Rotate left</button>
      <button type="button" onClick={() => actions.current.rotate(1)}>Rotate right</button>
      <button type="button" onClick={() => actions.current.zoom(0.8)}>Zoom in</button>
      <button type="button" onClick={() => actions.current.zoom(1.25)}>Zoom out</button>
      <button type="button" onClick={() => actions.current.reset()}>Reset view</button>
    </div>}
  </div>
}
