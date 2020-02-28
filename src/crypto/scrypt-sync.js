// var pbkdf2 = require('pbkdf2').pbkdf2Sync
const crypto = require('crypto')
// import crypto from 'crypto';
var fixOpts = require('./fix-opts')
var ScryptRom = require('./scrypt-rom');
module.exports = scryptSync
function scryptSync(password, salt, keylen, _opts) {
  var opts = fixOpts(_opts);
  var N = opts.N
  var r = opts.r
  var p = opts.p
  var maxmem = opts.maxmem
  var blen = p * 128 * r
  var vlen = 32 * r * (N + 2) * 4
  if (vlen + blen > maxmem) {
    throw new Error('excedes max memory')
  }
  var b = crypto.pbkdf2Sync(password, salt, 1, blen, 'sha256')

  var scryptRom = new ScryptRom(b, r, N, p)
  var out = scryptRom.run();

  var fin = crypto.pbkdf2Sync(password, out, 1, keylen, 'sha256')
  scryptRom.clean()
  return fin
}
