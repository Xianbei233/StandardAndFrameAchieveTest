let fs = require('fs');
let EventEmitter = require('events');

class ReadStream extends EventEmitter {
    constructor(path, options) {
        super(path, options);
        this.path = path;
        this.highWaterMark = options.highWaterMark || 64 * 1024;
        this.buffer = Buffer.alloc(this.highWaterMark);
        this.flags = options.flags || 'r';
        this.encoding = options.encoding;
        this.mode = options.mode || 0o666;
        this.start = options.start || 0;
        this.end = options.end;
        this.pos = this.start;
        this.autoClose = options.autoClose || true; this.bytesRead = 0;
        this.closed = false;
        this.flowing;
        this.needReadable = false;
        this.length = 0;
        this.buffers = [];
        this.on('end', function () { if (this.autoClose) { this.destroy(); } });
        this.on('newListener', (type) => {
            if (type == 'data') { this.flowing = true; this.read(); }
            if (type == 'readable') { this.read(0); }
        });
        this.open();
    }

    open() {
        fs.open(this.path, this.flags, this.mode, (err, fd) => {
            if (err) {
                if (this.autoClose) {
                    this.destroy();
                    return this.emit('error', err);
                }
            }
            this.fd = fd;
            this.emit('open');
        });
    }

    read(n) {
        if (typeof this.fd != 'number') {
            return this.once('open', () => this.read());
        }
        n = parseInt(n, 10);
        if (n != n) {
            n = this.length;
        }
        if (this.length == 0)
            this.needReadable = true;
        let ret;
        if (0 < n < this.length) {
            ret = Buffer.alloc(n);
            let b;
            let index = 0;
            while (null != (b = this.buffers.shift())) {
                for (let i = 0; i < b.length; i++) {
                    ret[index++] = b[i];
                    if (index == ret.length) {
                        this.length -= n;
                        b = b.slice(i + 1);
                        this.buffers.unshift(b);
                        break;
                    }
                }
            }
            if (this.encoding) ret = ret.toString(this.encoding);
        }

        let _read = () => {
            let m = this.end ? Math.min(this.end - this.pos + 1, this.highWaterMark) : this.highWaterMark;
            fs.read(this.fd, this.buffer, 0, m, this.pos, (err, bytesRead) => {
                if (err) {
                    return
                }
                let data;
                if (bytesRead > 0) {
                    data = this.buffer.slice(0, bytesRead);
                    this.pos += bytesRead;
                    this.length += bytesRead;
                    if (this.end && this.pos > this.end) {
                        if (this.needReadable) {
                            this.emit('readable');
                        }

                        this.emit('end');
                    } else {
                        this.buffers.push(data);
                        if (this.needReadable) {
                            this.emit('readable');
                            this.needReadable = false;
                        }

                    }
                } else {
                    if (this.needReadable) {
                        this.emit('readable');
                    }
                    return this.emit('end');
                }
            })
        }
        if (this.length == 0 || (this.length < this.highWaterMark)) {
            _read(0);
        }
        return ret;
    }

    destroy() {
        fs.close(this.fd, (err) => {
            this.emit('close');
        });
    }

    pause() {
        this.flowing = false;
    }

    resume() {
        this.flowing = true;
        this.read();
    }

    pipe(dest) {
        this.on('data', (data) => {
            let flag = dest.write(data);
            if (!flag) this.pause();
        });
        dest.on('drain', () => {
            this.resume();
        });
        this.on('end', () => {
            dest.end();
        });
    }
}

module.exports = ReadStream; 