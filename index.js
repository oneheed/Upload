const config = require('./config.json');
const express = require('express')
const multer  = require('multer')
const fs = require('fs');
const path = require('path');

const app = express()

const uploadPath = path.join(__dirname, 'upload');
const port = process.argv[2] || config.port || process.env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // 允許所有來源的跨來源請求
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // 允許的 HTTP 方法
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // 允許的自訂標頭
  next();
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // 指定檔案的儲存目錄
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      // 指定檔案的名稱
      const originalname = file.originalname;
      cb(null, originalname);
    }
  });
  
  const upload = multer({ storage: storage });

  app.post('/api/ImageUpload/PostFile', upload.array('image'), function (req, res) {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          status: -1,
          msg: '上傳出錯',
          data: '',
        });
      }
  
      let filePaths = [];
      req.files.forEach(function (file) {
        const filePath = '/upload/' + file.originalname;
        const destPath = path.join(uploadPath, file.originalname);
        fs.renameSync(file.path, destPath);
        filePaths.push(filePath);
      });
  
      return res.json({
        status: 0,
        msg: '上傳成功',
        data: filePaths,
      });
    } catch (error) {
      return res.status(500).json({
        status: -1,
        msg: '上傳出錯',
        data: '',
      });
    }
  });

  app.get('/upload/:filename', (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, 'upload', filename);
    
    // 使用 res.sendFile() 方法回傳圖片
    res.sendFile(imagePath);
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })