const makeCircle = size => ({
  height: size,
  width: size, 
  borderRadius: size / 2
})

const makeHitSlope = size => ({
  left: size,
  right: size,
  top: size,
  bottom: size
})

export { makeCircle, makeHitSlope }