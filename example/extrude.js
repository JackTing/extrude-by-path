var extrude = require('../')
var path = []
for (var i = 0; i <= 8; i++) {
  var theta = i/32*2*Math.PI
  path.push([Math.cos(theta),0,Math.sin(theta)])
}

var mesh = extrude({
  shape: [[-0.1,-0.1],[0,0.1],[0.1,-0.1]],
  path: path
})
console.log(JSON.stringify(mesh))
