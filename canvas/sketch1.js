const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [2048, 2048], // it can also accept 'A4' or other sizes
  // we can increase the resolution with pixelsPerInch, 300 is a correct value for printing
  // we can also change the orientation 'landscape' or 'portrait
};

const sketch = () => {
  // every time this function is called the canvas is cleared
  // context is the canvas API context
  return ({ context, width, height }) => {
    context.fillStyle = "red";
    context.fillRect(0, 0, width, height);

    context.beginPath();
    context.arc(width / 2, height / 2, 200, 0, 2 * Math.PI);
    context.fillStyle = "orange";
    context.fill();

    context.lineWidth = 20;
    context.strokeStyle = "blue";
    context.stroke(); // it applies to the same path we begin before
  };
};

canvasSketch(sketch, settings);
