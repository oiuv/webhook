const http = require('http');
const { spawn } = require('child_process') // 子进程, 用来执行脚本

http.createServer((req, res) => {
    console.log(`--- ${req.method} --- ${req.url} ---`);
    // console.log(`--- headers : ${JSON.stringify(req.headers)} ---`)
    // console.log(`--- ${JSON.stringify(req.trailers)} ---`)
    res.setHeader("Content-Type", "application/json");
    // request
    if (req.method === 'POST') {
        // 获取body
        let body;
        req.on('data', (data) => {
            // console.log(`--- data: ${data} ---`);
            body = data;
        });
        req.on('end', () => {
            let payload = JSON.parse(body);
            console.log(`--- ${payload.repository.url} ---`);
            //* linux和macOS
            if (process.platform === 'linux' || process.platform === 'darwin') {
                const sh = spawn('sh', [`./sh/${payload.repository.name}.sh`]);

                sh.stdout.on('data', (data) => {
                    console.log(`stdout: ${data}`);
                });
                sh.stdout.on('end', () => {
                    console.log('Mission Complete!')
                });

                sh.stderr.on('data', (data) => {
                    console.error(`stderr: ${data}`);
                });

                sh.on('close', (code) => {
                    console.log(`child process exited with code ${code}`);
                });
            }
            //* windows系统
            if (process.platform === 'win32') {
                const bat = spawn('cmd.exe', ['/c', `bat\\${payload.repository.name}.cmd`]);

                bat.stdout.on('data', (data) => {
                    console.log(data.toString());
                });
                bat.stdout.on('end', () => {
                    console.log('Mission Complete!')
                });

                bat.stderr.on('data', (data) => {
                    console.error(data.toString());
                });

                bat.on('exit', (code) => {
                    console.log(`Child exited with code ${code}`);
                });
            }

            // response
            let json = JSON.stringify({
                status: "success",
                code: 200
            });
            res.end(json);
        });
    }
    else {
        let json = JSON.stringify({
            status: "OK",
            code: 200
        });
        res.end(json);
    }

}).listen(8008)
