var extrude = require('../')
var path = []
for (var i = 0; i <= 8; i++) {
  var theta = i/8*2*Math.PI
  path.push([Math.cos(theta),0,Math.sin(theta)])
}

var mesh = extrude({
  positions: [[-0.1,-0.1],[0,0.1],[0.1,-0.1]],
  edges: [[0,1],[1,2],[2,0]],
  cells: [[0,1,2]],
  path: path,
  closed: true
})
console.log(JSON.stringify(mesh))
