const fs = require('fs');

const PATCH_FLAG = Symbol.for('syncworkflow.patchReadlink');
if (!global[PATCH_FLAG]) {
  global[PATCH_FLAG] = true;

  const originalReadlink = fs.readlink.bind(fs);
  const originalReadlinkSync = fs.readlinkSync.bind(fs);
  const originalReadlinkPromise = fs.promises?.readlink?.bind(fs.promises);
  const originalRealpath = fs.realpath.bind(fs);
  const originalRealpathSync = fs.realpathSync.bind(fs);
  const originalRealpathPromise = fs.promises?.realpath?.bind(fs.promises);

  const normalizeArgs = (p, options, callback) => {
    if (typeof options === 'function') {
      callback = options;
      options = undefined;
    }
    return { targetPath: p, options, callback };
  };

  fs.readlink = function patchedReadlink(p, options, callback) {
    const { targetPath, options: opts, callback: cb } = normalizeArgs(p, options, callback);
    return originalReadlink(targetPath, opts, (err, result) => {
      if (err && err.code === 'EINVAL') {
        originalRealpath(targetPath, opts, cb);
        return;
      }
      cb?.(err, result);
    });
  };

  fs.readlinkSync = function patchedReadlinkSync(p, options) {
    try {
      return originalReadlinkSync(p, options);
    } catch (err) {
      if (err && err.code === 'EINVAL') {
        return originalRealpathSync(p, options);
      }
      throw err;
    }
  };

  if (originalReadlinkPromise && originalRealpathPromise) {
    fs.promises.readlink = async function patchedReadlinkPromise(p, options) {
      try {
        return await originalReadlinkPromise(p, options);
      } catch (err) {
        if (err && err.code === 'EINVAL') {
          return originalRealpathPromise(p, options);
        }
        throw err;
      }
    };
  }
}

module.exports = undefined;
