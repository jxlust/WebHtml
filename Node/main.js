const https = require("https");
const http = require("http");
const { Http2ServerRequest } = require("http2");

console.log(1);
https.get("https://www.baidu.com", (res) => {
  const { statusCode } = res;
  console.log("code:", statusCode);
  res.setEncoding("utf8");
  let rawData = "";
  res.on("data", (chunk) => {
    rawData += chunk;
  });
  res.on("end", () => {
    try {
      console.log("data:", rawData);
      //   const parsedData = JSON.parse(rawData);
      //   console.log(parsedData);
    } catch (e) {
      console.error(e.message);
    }
  });
});
