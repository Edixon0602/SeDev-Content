const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 3000;
const STATUS_FILE = path.join(process.cwd(), 'animaciones', 'manifests', 'production_status.json');
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.mp4': 'video/mp4',
  '.svg': 'image/svg+xml'
};

function readStatusMap() {
  try {
    if (fs.existsSync(STATUS_FILE)) {
      return JSON.parse(fs.readFileSync(STATUS_FILE, 'utf8'));
    }
  } catch (e) {}
  return {};
}

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);

  // API Endpoint to read/write production curation status (Grabada / Descartada / Pendiente)
  if (reqPath === '/api/status') {
    if (req.method === 'GET') {
      const data = readStatusMap();
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
      res.end(JSON.stringify(data));
      return;
    }
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk.toString(); });
      req.on('end', () => {
        try {
          const payload = JSON.parse(body || '{}');
          const current = readStatusMap();
          const next = payload.statuses ? payload.statuses : Object.assign({}, current, payload);
          fs.writeFileSync(STATUS_FILE, JSON.stringify(next, null, 2), 'utf8');
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ ok: true, statuses: next }));
        } catch (err) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ ok: false, error: err.message }));
        }
      });
      return;
    }
  }

  if (reqPath === '/' || reqPath === '') reqPath = '/animaciones/player.html';
  const filePath = path.join(process.cwd(), reqPath);

  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('File Not Found');
    return;
  }

  const stat = fs.statSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  // Support HTTP 206 Partial Content for instant MP4 video seeking
  if (ext === '.mp4') {
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
      const chunksize = (end - start) + 1;
      const fileStream = fs.createReadStream(filePath, { start, end });
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stat.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': contentType,
        'Cache-Control': 'no-cache'
      });
      fileStream.pipe(res);
      return;
    }
  }

  // Normal static file delivery with cache-busting headers
  res.writeHead(200, {
    'Content-Type': contentType,
    'Content-Length': stat.size,
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
  });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}/animaciones/player.html`;
  console.log(`\n======================================================`);
  console.log(`🚀 SEDEV STUDIO REVIEW SUITE ACTIVO:`);
  console.log(`   ${url}`);
  console.log(`======================================================\n`);
  exec(`start ${url}`);
});
