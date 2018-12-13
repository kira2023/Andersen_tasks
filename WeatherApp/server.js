const http = require('http');
const failSistem = require('fs');
const url = require('url');
const contentType = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'text/javascript',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'woff2':'font/woof2'
};
const cities = require('./data/cities.json');

http.createServer((req, res) => {
    if (req.url.startsWith('/city-search')) {
        const param = url.parse(req.url, true);
        hendleCitySearch(param.query.q, res);
    } else {
        hendleStaticSources(req.url, res);
    }
})
.listen(3000);

function hendleStaticSources(src, res) {
    const staticPath = src === '/' ? './index.html' : `.${src}`;
    
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
        res.end(content);  
    })
};

function hendleCitySearch(searchStr, res){
    if (!searchStr){
        res.end('Empty result');
    }

    const foundCities = cities.filter((item) => {
        return item.city.toUpperCase().startsWith(searchStr.toUpperCase());
    })


    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(foundCities));  
};
