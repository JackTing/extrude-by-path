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
  var shape = opts.shape, path = opts.path
  var sl = shape.length, pl = path.length
  for (var i = 0; i < pl-1; i++) {
    var n = [0,0,1]
    subtract(v,path[i],path[i+1])
    normalize(v,v)
    cross(axis,n,v)
    var angle = Math.acos(dot(n,v))
    identity(mat)
    rotate(mat,mat,angle,axis)
    var twist = path[i][3]
    if (twist) rotate(mat,mat,twist,n)
    for (var j = 0; j < sl; j++) {
      var pt = [shape[j][0],shape[j][1],shape[j][2]||0]
      trmat(pt, pt, mat)
      add(pt,pt,path[i])
      mesh.positions.push(pt)
      if (i < pl-2) {
        mesh.cells.push([i*sl+j,i*sl+(j+1)%sl,(i+1)*sl+j])
        mesh.cells.push([i*sl+(j+1)%sl,(i+1)*sl+j,(i+1)*sl+(j+1)%sl])
      }
    }
  }
  return mesh
}
