const canvasSketch = require('canvas-sketch')
const { lerp } = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [2048, 2048],
}

const sketch = () => {
  const createGrid = () => {
    const points = []
    const count = 85

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        // it is useful to work with numbers between 0 and 1
        // instead of the final coordinates
        const u = count <= 1 ? 0.5 : x / (count - 1)
        const v = count <= 1 ? 0.5 : y / (count - 1)

        points.push([u, v])
      }
    }

    return points
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'tomato'
    context.fillRect(0, 0, width, height)

    random.setSeed(10) // creates a deterministic random, so it not changes with refresh
    const points = createGrid().filter(() => random.value() > 0.5)
    const margin = 200

    points.forEach(([u, v]) => {
      const x = lerp(margin, width - margin, u) // intrpolates between the first two params
      const y = lerp(margin, height - margin, v)

      context.beginPath()
      context.arc(x, y, 5, 0, Math.PI * 2, false)
      context.fillStyle = 'white'
      context.fill()
    })
  }
}

canvasSketch(sketch, settings)
