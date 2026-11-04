const http = require('http');
const fs = require('fs');
const path = require('path');

// Render sẽ tự động truyền cổng qua biến môi trường PORT
const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
    '.html': 'text/html; charset=UTF-8',
    '.css': 'text/css; charset=UTF-8',
    '.js': 'text/javascript; charset=UTF-8',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    // Lấy đường dẫn file, mặc định trang chủ là index.html
    let reqUrl = req.url.split('?')[0];
    let filePath = reqUrl === '/' ? path.join(__dirname, 'index.html') : path.join(__dirname, reqUrl);

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            // Nếu không tìm thấy file, trả về index.html
            fs.readFile(path.join(__dirname, 'index.html'), (indexErr, indexData) => {
                if (indexErr) {
                    res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
                    res.end('404 Not Found');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
                    res.end(indexData);
                }
            });
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server đang chạy tại cổng ${PORT}`);
});
