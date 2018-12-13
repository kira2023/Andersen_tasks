const http = require('http');
const failSistem = require('fs');
const contentType = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'text/javascript',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'woff2':'font/woof2'
}

http.createServer((req, res) => {
    const staticPath = req.url === '/' ? './index.html' : `.${req.url}`;
    
    failSistem.readFile(staticPath, (error, content) => {
        if (error || !content) {
            res.end('Server error!');
            console.log(error);
            return error;
        }

        const pathParts = staticPath.split('.');
        
        res.writeHead(200, {
            'Content-Type': contentType[pathParts[pathParts.length - 1]]
        });
        res.end(data);  
    })
})
.listen(3000);



