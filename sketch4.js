const canvasSketch = require('canvas-sketch')
const { lerp } = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')

const settings = {
  dimensions: [2048, 2048],
}

const sketch = () => {
  const colorCount = random.rangeFloor(1, 5)
  const palette = random.shuffle(random.pick(palettes)).slice(0, colorCount)

  const createGrid = () => {
    const points = []
    const count = 35

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        // it is useful to work with numbers between 0 and 1
        // instead of the final coordinates
        const u = count <= 1 ? 0.5 : x / (count - 1)
        const v = count <= 1 ? 0.5 : y / (count - 1)

        points.push({
          position: [u, v],
          // gaussian creates a less uniform randomness
          radius: Math.abs(random.gaussian() * 0.02),
          color: random.pick(palette),
        })
      }
    }

    return points
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    random.setSeed(10) // creates a deterministic random, so it not changes with refresh
    const points = createGrid().filter(() => random.gaussian() > 0.5)
    const margin = 200

    points.forEach((data) => {
      const { position, radius, color } = data
      const [u, v] = position

      const x = lerp(margin, width - margin, u) // intrpolates between the first two params
      const y = lerp(margin, height - margin, v)

      context.beginPath()
      context.arc(x, y, radius * width, 0, Math.PI * 2, false)
      context.fillStyle = color
      context.fill()
    })
  }
}

canvasSketch(sketch, settings)
