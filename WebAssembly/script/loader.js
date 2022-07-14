class WasmLoader {
  constructor() {}
  async wasm(path) {
    if (!WebAssembly.instantiateStreaming) {
      //not support compileStreaming
      return await this.wasmFallback(path);
    }
    const { instance } = await WebAssembly.instantiateStreaming(fetch(path));
    return instance?.exports;
  }
  async wasmFallback(path) {
    const response = await fetch(path);
    const bytes = response?.arrayBuffer();
    const { instance } =  await WebAssembly.instantiate(bytes);

    return instance?.exports;

  }
}
