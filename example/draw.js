var extrude = require('../')
var helix = []
for (var i = 0; i < 1000; i++) {
  var theta = i/320*2*Math.PI, d = (i-500)/250
  helix.push([Math.cos(theta),Math.sin(theta),d,theta*8])
}
var mesh = extrude({
  positions: [[0,0],[-0.06,-0.08],[0.06,-0.08],[0,-0.2],[0.06,-0.08],
    [0.1,0.03],[0.19,-0.06],[0.1,0.03],[0,0.1],[0.12,0.16],[0,0.1],
    [-0.1,0.03],[-0.12,0.16],[-0.1,0.03],[-0.06,-0.08],[-0.19,-0.06]],
  cells: [[1,3,2],[0,1,2],[4,6,5],[0,4,5],[7,9,8],[0,7,8],[10,12,11],
    [0,10,11],[13,15,14],[0,13,14]],
  edges: [[0,1],[0,2],[0,4],[0,5],[0,7],[0,8],[0,10],[0,11],[0,13],[0,14],
    [1,2],[1,3],[2,3],[4,5],[4,6],[5,6],[7,8],[7,9],[8,9],[10,11],[10,12],
    [11,12],[13,14],[13,15],[14,15]],
  path: helix
})

var regl = require('regl')()
var camera = require('regl-camera')(regl, {
  distance: 6.1, theta: -1.2, phi: -0.6, center: [0,0,-1]
})
var solid = require('meshview/solid')
var draw = regl(solid(mesh))
regl.frame(function () {
  regl.clear({ color: [1,1,1,1], depth: true })
  camera(function () { draw() })
})
