
module.exports = function (opts) {
  var out =  {
    N: 16384,
    p: 1,
    r: 8,
    maxmem: 32 << 20
  };
  if (!opts) {
    return out;
  }
  if (opts.N) {
    out.N = opts.N
  } else if (opts.cost) {
    out.N = opts.cost
  }
  if (opts.p) {
    out.p = opts.p
  } else if (opts.parallelization) {
    out.p = opts.parallelization
  }
  if (opts.r) {
    out.r = opts.r;
  } else if (opts.blockSize) {
    out.r = opts.blockSize
  }
  if (opts.maxmem) {
    out.maxmem = opts.maxmem
  }
  return out;
}
