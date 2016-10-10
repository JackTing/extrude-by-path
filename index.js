var trmat = require('gl-vec3/transformMat4')
var add = require('gl-vec3/add')
var subtract = require('gl-vec3/subtract')
var normalize = require('gl-vec3/normalize')
var cross = require('gl-vec3/cross')
var dot = require('gl-vec3/dot')
var identity = require('gl-mat4/identity')
var rotate = require('gl-mat4/rotate')

var mat = [], v = [], axis = []

module.exports = function (opts) {
  var mesh = { positions: [], cells: [] }
  var path = opts.path
  var positions = opts.shape.positions
  var edges = opts.shape.edges, cells = opts.shape.cells || []
  var spl = positions.length, sel = edges.length, scl = cells.length
  var pl = path.length
  for (var i = 0; i < pl; i++) {
    var n = [0,0,1]
    if (i === 0) {
      subtract(v,path[i],path[i+1])
    } else if (i === pl-1) {
      subtract(v,path[i-1],path[i])
    } else {
      subtract(v,path[i-1],path[i+1])
    }
    normalize(v,v)
    cross(axis,n,v)
    var angle = Math.acos(dot(n,v))
    identity(mat)
    rotate(mat,mat,angle,axis)
    var twist = path[i][3]
    if (twist) rotate(mat,mat,twist,n)
    for (var j = 0; j < spl; j++) {
      var p = positions[j]
      var pt = [p[0],p[1],p[2]||0]
      trmat(pt, pt, mat)
      add(pt,pt,path[i])
      mesh.positions.push(pt)
    }
  }
  for (var i = 0; i < pl-1; i++) {
    for (var j = 0; j < sel; j++) {
      var e = edges[j]
      mesh.cells.push([i*spl+e[0],i*spl+e[1],(i+1)*spl+e[0]])
      mesh.cells.push([i*spl+e[1],(i+1)*spl+e[0],(i+1)*spl+e[1]])
    }
  }
  if (cells && opts.startCap !== false && opts.caps !== false) {
  }
  if (cells && opts.endCap !== false && opts.caps !== false) {
  }
  return mesh
}
