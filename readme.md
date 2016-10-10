# extrude-by-path

extrude a 2d shape along a 3d path to build a [simplicial complex][1]

[1]: https://npmjs.com/package/simplicial-complex

# example

This demo extrudes a star polygon along a helix path, twisting eight times per
revolution of the helix.

https://substack.neocities.org/extrude-helix.html

``` js
var extrude = require('extrude-by-path')
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
console.log(JSON.stringify(mesh))
```

# api

``` js
var extrude = require('extrude-by-path')
```

## var mesh = extrude(opts)

* `opts.positions` - array of `[x,y]` points in the polygon
* `opts.edges` - array of `[i,j]` indices of positions
* `opts.cells` - array of `[i,j,k]` indices of positions (required for capping)
* `opts.path` - array of `[x,y,z]` or `[x,y,z,twist]` points. twist in radians.
* `opts.startCap` - set to `false` to skip the start cap
* `opts.endCap` - set to `false` to skip the end cap
* `opts.caps` - set to `false` to skip all caps

# install

```
npm install extrude-by-path
```

# license

BSD
