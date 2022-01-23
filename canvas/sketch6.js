const canvasSketch = require('canvas-sketch')
const { lerp } = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')

const settings = {
  dimensions: [2048, 2048],
}

const sketch = () => {
  const palette = random.shuffle(random.pick(palettes))

  const createGrid = () => {
    const points = []
    const count = 6

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1)
        const v = count <= 1 ? 0.5 : y / (count - 1)

        points.push([u, v])
      }
    }

    return points
  }

  const getTrapezoid = (grid, width, height) => {
    const margin = 200

    const point1 = random.pick(grid)
    const point2 = random.pick(grid.filter(([u]) => u !== point1[0]))

    const x1 = lerp(margin, width - margin, point1[0])
    const y1 = lerp(margin, height - margin, point1[1])

    const x2 = lerp(margin, width - margin, point2[0])
    const y2 = lerp(margin, height - margin, point2[1])

    const color = random.pick(palette)

    return {
      point1: [x1, y1],
      point2: [x2, y2],
      color,
      mediumHeight: Math.abs(y2 - y1) / 2,
    }
  }

  const drawTrapezoid = (trapezoid, context, height) => {
    const { point1, point2, color } = trapezoid
    const [x1, y1] = point1
    const [x2, y2] = point2

    context.beginPath()
    context.strokeStyle = 'white'
    context.lineWidth = 30

    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.lineTo(x2, height)
    context.lineTo(x1, height)
    context.lineTo(x1, y1)

    context.fillStyle = color
    context.stroke()
    context.fill()
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    const grid = createGrid()

    const count = 25
    let trapezoids = []
    for (let i = 0; i < count; i++) {
      trapezoids.push(getTrapezoid(grid, width, height))
    }

    trapezoids.sort((t1, t2) => t2.mediumHeight - t1.mediumHeight)

    console.log(trapezoids)

    trapezoids.forEach((t) => drawTrapezoid(t, context, height))
  }
}

canvasSketch(sketch, settings)
