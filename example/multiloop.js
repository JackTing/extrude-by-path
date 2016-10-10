var extrude = require('../')
var path = []
for (var i = 0; i <= 8; i++) {
  var theta = i/32*2*Math.PI
  path.push([Math.cos(theta),0,Math.sin(theta)])
}

var mesh = extrude({
  positions: [
    [-0.1,-0.1],[0,0.1],[0.1,-0.1],
    [-0.25,0.2],[-0.2,0.1],[-0.15,0.2]
  ],
  edges: [
    [0,1],[1,2],[2,0], // first triangle
    [3,4],[4,5],[5,3] // second triangle
  ],
  cells: [[0,1,2],[3,4,5]], // if you want caps
  path: path
})
console.log(JSON.stringify(mesh))
