const fs = require('fs');
const path = require('path');

module.exports = {
  get version() {
    try {
      const version = require('../../croxydb/package.json').version;

      return version;
    } catch (error) {
      if (error.code == 'MODULE_NOT_FOUND') {
        throw new Error("Croxydb module is not installed! You can type 'npm i croxydb' to install it.")
      } else {
        throw new Error('An error occurred! Here is the error that occurred: ' + error.message);
      }
    }
  },

  get size() {
    try {
      const filePath = path.resolve(__dirname, '../../../croxydb/croxydb.json');

      const stats = fs.statSync(filePath);
      const dosyaBoyutu = stats.size;

      if (dosyaBoyutu < 1024) {
        return `${dosyaBoyutu} Bytes`;
      } else if (dosyaBoyutu < 1024 * 1024) {
        return `${(dosyaBoyutu / 1024).toFixed(2)} Kb`;
      } else if (dosyaBoyutu < 1024 * 1024 * 1024) {
        return `${(dosyaBoyutu / (1024 * 1024)).toFixed(2)} Mb`;
      } else {
        return `${(dosyaBoyutu / (1024 * 1024 * 1024)).toFixed(2)} Gb`;
      }
    } catch (error) {
      if (error.errno == -4058) {
        throw new Error("Croxydb module is not installed! You can type 'npm i croxydb' to install it.")
      } else {
        throw new Error('An error occurred! Here is the error that occurred: ' + error.message);
      }
    }
  },
};