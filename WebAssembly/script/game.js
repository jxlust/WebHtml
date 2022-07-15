const WIDTH = 100,
  HEIGHT = 100;
const SIZE = WIDTH * HEIGHT;

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.height = HEIGHT;
canvas.width = WIDTH;

const randomInt = (n) => {
  return (Math.random() * n) | 0;
};

const memory = new WebAssembly.Memory({
  initial: 10,
  maximum: 100,
});

async function loaderTheWasm() {
  const { instance } = await WebAssembly.instantiateStreaming(
    fetch("../build/release.wasm"),
    { env: { memory: memory } }
  );
  return instance?.exports;
}

const Controls = {
  None: "Controls.None",
  Up: "Controls.Up",
  Down: "Controls.Down",
  Left: "Controls.Left",
  Right: "Controls.Right",
};

let curControl = Controls.None;

document.addEventListener("keydown", (event) => {
  console.log(event);
  switch (event.key) {
    case "ArrowUp":
      curControl = Controls.Up;
      break;
    case "ArrowDown":
      curControl = Controls.Down;
      break;
    case "ArrowLeft":
      curControl = Controls.Left;
      break;
    case "ArrowRight":
      curControl = Controls.Right;
      break;
  }
});

document.addEventListener("keyup", () => {
  curControl = Controls.None;
});

function update(wasm, mem, imageData, rgba32) {
  wasm.update(wasm[curControl]);
  console.log("mem::", mem);
  //   rgba32.set(mem.subArray(0, SIZE));
  //   ctx.putImageData(imageData, 0, 0);
}

function randomDraw() {
  let imgData = ctx.getImageData(0, 0, 100, 100);
  console.log("get imgData:", imgData);
  // 4 * 100 * 100 (0,0,0,0) = rgba [0-255]
  // binary：00000000 - 11111111
  for (let i = 0; i < 4 * 100 * 100; i += 4) {
    if (Math.random() < 0.35) {
      imgData.data[i] = randomInt(256);
      imgData.data[i + 1] = randomInt(256);
      imgData.data[i + 2] = randomInt(256);
      imgData.data[i + 3] = 255;
    }
  }
  ctx.putImageData(imgData, 0, 0);
}
function testMemory() {
  let mem2 = new Uint32Array(memory.buffer);
  for (let i = 0; i < 10; i++) {
    mem2[i] = i;
  }
  const sum = module.compulate(0, 10);
  console.log("sum:", sum);
}

async function start() {
  let module = await loaderTheWasm();
  console.log(module);
  module.start();
  //初始化对应的内存数据，用于传递到wasm里处理
  // 32bit => 8bit color * 4 (RGBA)
  let mem = new Uint32Array(module.memory.buffer);
  console.log("mem::", mem);
  //   let mem = new Uint32Array(memory.buffer);
  //   console.log(11, module?.fibonacci(10));
  const imageData = ctx.createImageData(WIDTH, HEIGHT);
  const rgba32Buffer = new Uint32Array(imageData.data.buffer);
  //   console.log("create imageData:", imageData);

//   const updateCallBack = (timestamp) => {
//     // console.log("raf call:", timestamp);
//     update(module, mem, imageData, rgba32Buffer);
//     window.requestAnimationFrame(updateCallBack);
//   };
//   window.requestAnimationFrame(updateCallBack);
}

start();