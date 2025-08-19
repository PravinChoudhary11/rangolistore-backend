const fs = require('fs');
const path = require('path');

module.exports = {
  init(providerOptions = {}, options = {}) {
    return {
      // This function is called when an image is uploaded as a complete file (buffer)
      async upload(file) {
        const uploadPath = path.join(__dirname, '..', '..', 'public', 'uploads');
        const fileName = `${file.hash}${file.ext}`;
        const filePath = path.join(uploadPath, fileName);

        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
        }

        fs.writeFileSync(filePath, file.buffer);
        file.url = `/uploads/${fileName}`;
        return file;
      },

      // This function is called when an image is uploaded as a stream.
      async uploadStream(file) {
        return new Promise((resolve, reject) => {
          const uploadPath = path.join(__dirname, '..', '..', 'public', 'uploads');
          const fileName = `${file.hash}${file.ext}`;
          const filePath = path.join(uploadPath, fileName);

          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }

          const writeStream = fs.createWriteStream(filePath);
          file.stream.pipe(writeStream);

          writeStream.on('finish', () => {
            file.url = `/uploads/${fileName}`;
            resolve(file);
          });

          writeStream.on('error', (error) => {
            reject(error);
          });
        });
      },

      // Optional: Implement other methods if necessary (delete, etc.)
      async delete(file) {
        // Remove the leading slash from file.url to form a proper relative file path
        const relativePath = file.url.startsWith('/') ? file.url.slice(1) : file.url;
        const filePath = path.join(__dirname, '..', '..', 'public', relativePath);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      },
    };
  },
};
