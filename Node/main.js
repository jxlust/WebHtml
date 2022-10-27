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
const url =
  "https://www.baidu.com/rec?platform=wise&ms=1&rset=rcmd&word=123&qid=11327900426705455986&rq=123&from=844b&baiduid=A1D0B88941B30028C375C79CE5AC2E5E%3AFG%3D1&tn=&clientWidth=375&t=1506826017369&r=8255";

https.get(url, (res) => {
  const { statusCode } = res;
  console.log("json code:", statusCode);
  res.setEncoding("utf8");
  let rawData = "";
  res.on("data", (chunk) => {
    rawData += chunk;
  });
  res.on("end", () => {
    try {
      console.log("json:", rawData);
      //   const parsedData = JSON.parse(rawData);
      //   console.log(parsedData);
    } catch (e) {
      console.error(e.message);
    }
  });
});
