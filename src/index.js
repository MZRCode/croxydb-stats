const fs = require('fs');
const path = require('path');

module.exports = {
  get size() {
    try {
      /*if(require("../package.json").version !== "0.0.3") {
        console.warn("Eski bir sürümü kullanıyorsunuz! 'npm install croxydb-stats@latest' yazarak modülü güncelleyebilirsin.")
        process.exit(1);
      };*/

      const filePath = path.resolve(__dirname, '../croxydb/croxydb.json');

      if (!filePath) {
        throw new Error('croxydb.json dosyası bulunmuyor!')
      } else {
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
      }
    } catch (error) {
      throw new Error('Bir hata oluştu! İşte oluşan hata: ' + error.message);
    }
  },
};