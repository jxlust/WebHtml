const http = require("http");
const testStr =
    "Hello, the world is so beautiful! We come from the depths of the universe!";
const eventServer = http
    .createServer((req, res) => {
        res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
                "Content-Type,Content-Length,Authorization,Accept,X-Requested-With",
            "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
        });
        let index = 0;
        setInterval(() => {
            // 事件要用两个\n结束
            //   res.write("data: The server time is: " + new Date() + "\n\n");
            res.write(`${testStr[index]}`);
            index++;
            if (index === testStr.length) {
                res.end();
            }
        }, 100);
        req.connection.addListener(
            "close",
            () => {
                console.log("SSE connection closed!");
            },
            false
        );
    })
    .listen(4001);
