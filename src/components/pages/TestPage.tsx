import React, { createRef, useEffect, useRef, useState } from 'react'

type Layer = {
  name: string
  order: number
  files?: FileList | []
}

const BODY = 'body 1.png'
const EYES = 'eyes 2.png'
const MOUTH = 'mouth 7.png'

function TestPage(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const layerRef = useRef<HTMLDivElement>(null)
  const [selectedFiles, setSelectedFiles] = useState<Array<File> | []>([])
  const [imageSources, setImageSources] = useState<Array<string>>([])
  const [mockLayerConfig, setMockLayerConfig] = useState<Array<Layer>>([])

  useEffect(() => {
    queueImages()
  }, [selectedFiles])

  useEffect(() => {
    drawImagesOnCanvas()
  }, [imageSources])

  function queueImages() {
    const imagesList: Array<string> = []

    Array.from(selectedFiles).map((file: File) => {
      imagesList.push(URL.createObjectURL(file))
    })

    setImageSources(imagesList)
  }

  function drawImagesOnCanvas() {
    Promise
      .all(imageSources.map(i => loadImage(i)))
      .then(images => {
        if (canvasRef.current) {
          const canvas = canvasRef.current
          const context = canvas.getContext('2d')
  
          if (!context) return
  
          images.map(image => {
            context.drawImage(image as HTMLImageElement, 0, 0, canvas.width, canvas.height)
          })
        }
      })
  }

  async function loadImage(src: string) {
    return new Promise((resolve, reject) => {
      const image = new Image()
        
        image.src = src
  
        image.onload = () => resolve(image)
        image.onerror = reject
    })
  }

  function addLayer() {
    const layer = layerRef.current
    const nextOrder = layer?.children.length || 0
    const newLayer = {
      name: `Layer ${nextOrder}`,
      order: nextOrder
    }

    setMockLayerConfig([...mockLayerConfig, newLayer])
  }

  function setLayers(order: number, newLayer: Layer) {
    const newLayers: Array<Layer> = mockLayerConfig.filter(layer => layer.order !== order) as Array<Layer>

    newLayers.push(newLayer)
    newLayers.sort((a, b) => a?.order - b?.order)

    setMockLayerConfig(newLayers)
  }

  function setFilesToGenerate() {
    const files: File[] = []

    console.log({ mockLayerConfig })

    mockLayerConfig.map(layer => {
      if (layer.files)
        files.push(layer.files[0])
    })

    setSelectedFiles(files)
  }

  const onChangeLayerFiles = (order: number) => ({ target: { files } }: React.ChangeEvent<HTMLInputElement>) => {
    const layer = mockLayerConfig.find(layer => layer.order === order) as Layer

    if (layer) {
      layer.files = files instanceof FileList ? files : []
    }

    setLayers(order, layer)
  }

  const onChangeLayerName = (order: number) => ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    const layer = mockLayerConfig.find(layer => layer.order === order) as Layer

    if (layer) {
      layer.name = value
    }

    setLayers(order, layer)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <button onClick={addLayer}>Add Layer</button>
          <button onClick={setFilesToGenerate}>Generate</button>
        </div>
        <canvas ref={canvasRef} height={500} width={500} style={{ border: '1px dashed gray' }}></canvas>
      </div>
      <div ref={layerRef} style={{ display: 'flex', alignItems: 'start', flexDirection: 'column' }}>
        {mockLayerConfig.map(item => {
          return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }} key={`item-${item.order}`}>
              <input type="file" style={{ textAlign: 'left' }} onChange={onChangeLayerFiles(item.order)} multiple />
              <input type="text" value={item.name} onChange={onChangeLayerName(item.order)} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TestPage