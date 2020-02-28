
function blockxor(S, Si, D, Di, len){
  var i = -1;
  while (++i < len) {
    D[Di + i] ^= S[Si + i]
  }
}
function arraycopy (src, srcPos, dest, destPos, length) {
  src.copy(dest, destPos, srcPos, srcPos + length)
}

var Buffer = require('safe-buffer').Buffer

module.exports = ScryptRom

function ScryptRom (b, r, N, p) {
  this.B = b
  this.r = r
  this.N = N
  this.p = p
  this.XY = Buffer.allocUnsafe(256 * r)
  this.V = Buffer.allocUnsafe(128 * r * N)
  this.B32 = new Int32Array(16) // salsa20_8
  this.x = new Int32Array(16) // salsa20_8
  this._X = Buffer.allocUnsafe(64) // blockmix_salsa8
}
ScryptRom.prototype.run = function () {
  var p = this.p | 0
  var r = this.r  | 0
  for (var i = 0;i < p;i++) {
    this.scryptROMix(i, r)
  }
  return this.B
}
ScryptRom.prototype.scryptROMix = function (i, r) {
  var blockStart = i * 128 * r
  var offset = (2 * r - 1) * 64
  var blockLen = 128 * r
  var B = this.B
  var N = this.N | 0
  var V = this.V
  var XY = this.XY
  B.copy(XY, 0, blockStart, blockStart + blockLen)
  for (var i1 = 0; i1 < N; i1++) {
    XY.copy(V, i1 * blockLen, 0, blockLen)
    this.blockmix_salsa8(blockLen)
  }

  var j;
  for (var i2 = 0;i2 < N;i2++) {
    j = XY.readUInt32LE(offset) & (N - 1)
    blockxor(V, j * blockLen, XY, 0, blockLen)
    this.blockmix_salsa8(blockLen)
  }
  XY.copy(B, blockStart, 0,  blockLen)
}
ScryptRom.prototype.blockmix_salsa8 = function (blockLen) {
  var BY = this.XY
  var r = this.r
  var _X = this._X
  arraycopy(BY, (2 * r - 1) * 64, _X, 0, 64)
  var i
  for (i = 0;i < 2 * r;i++) {
    blockxor(BY, i * 64, _X, 0, 64)
    this.salsa20_8()
    arraycopy(_X, 0, BY, blockLen + (i * 64), 64)
  }
  for (i = 0;i < r;i++) {
    arraycopy(BY, blockLen + (i * 2) * 64, BY, (i * 64), 64)
    arraycopy(BY, blockLen + (i * 2 + 1) * 64, BY, (i + r) * 64, 64)
  }
}
ScryptRom.prototype.salsa20_8 = function () {
  var B32 = this.B32
  var B = this._X
  var x = this.x

  var i
  for (i = 0;i < 16;i++) {
    B32[i] = (B[i * 4 + 0] & 0xff) << 0
    B32[i] |= (B[i * 4 + 1] & 0xff) << 8
    B32[i] |= (B[i * 4 + 2] & 0xff) << 16
    B32[i] |= (B[i * 4 + 3] & 0xff) << 24
  }

  for (i = 0;i < 16;i++) {
    x[i] = B32[i]
  }

  for (i = 0;i < 4;i++) {
    x[4] ^= R(x[0] + x[12], 7)
    x[8] ^= R(x[4] + x[0], 9)
    x[12] ^= R(x[8] + x[4], 13)
    x[0] ^= R(x[12] + x[8], 18)
    x[9] ^= R(x[5] + x[1], 7)
    x[13] ^= R(x[9] + x[5], 9)
    x[1] ^= R(x[13] + x[9], 13)
    x[5] ^= R(x[1] + x[13], 18)
    x[14] ^= R(x[10] + x[6], 7)
    x[2] ^= R(x[14] + x[10], 9)
    x[6] ^= R(x[2] + x[14], 13)
    x[10] ^= R(x[6] + x[2], 18)
    x[3] ^= R(x[15] + x[11], 7)
    x[7] ^= R(x[3] + x[15], 9)
    x[11] ^= R(x[7] + x[3], 13)
    x[15] ^= R(x[11] + x[7], 18)
    x[1] ^= R(x[0] + x[3], 7)
    x[2] ^= R(x[1] + x[0], 9)
    x[3] ^= R(x[2] + x[1], 13)
    x[0] ^= R(x[3] + x[2], 18)
    x[6] ^= R(x[5] + x[4], 7)
    x[7] ^= R(x[6] + x[5], 9)
    x[4] ^= R(x[7] + x[6], 13)
    x[5] ^= R(x[4] + x[7], 18)
    x[11] ^= R(x[10] + x[9], 7)
    x[8] ^= R(x[11] + x[10], 9)
    x[9] ^= R(x[8] + x[11], 13)
    x[10] ^= R(x[9] + x[8], 18)
    x[12] ^= R(x[15] + x[14], 7)
    x[13] ^= R(x[12] + x[15], 9)
    x[14] ^= R(x[13] + x[12], 13)
    x[15] ^= R(x[14] + x[13], 18)
  }
  for (i = 0;i < 16;i++) {
    B32[i] += x[i]
  }
  var bi

  for (i = 0;i < 16;i++) {
    bi = i * 4
    B[bi + 0] = (B32[i] >> 0 & 0xff)
    B[bi + 1] = (B32[i] >> 8 & 0xff)
    B[bi + 2] = (B32[i] >> 16 & 0xff)
    B[bi + 3] = (B32[i] >> 24 & 0xff)
  }
}
ScryptRom.prototype.clean = function () {
  this.XY.fill(0)
  this.V.fill(0)
  this._X.fill(0)
  this.B.fill(0)
  for (var i = 0;i < 16;i++) {
    this.B32[i] = 0
    this.x[i] = 0
  }
}
function R (a, b) {
  return (a << b) | (a >>> (32 - b))
}
