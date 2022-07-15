class WasmLoader {
  constructor() {
    this._imports = {
      env: {
        abort() {
          throw new Error("wasm error abort...");
        },
      },
    };
  }
  async wasm(path, imports = this._imports) {
    if (!WebAssembly.instantiateStreaming) {
      //not support compileStreaming
      return await this.wasmFallback(path, imports);
    }
    const { instance } = await WebAssembly.instantiateStreaming(
      fetch(path),
      imports
    );
    return instance?.exports;
  }
  async wasmFallback(path, imports) {
    const response = await fetch(path);
    const bytes = response?.arrayBuffer();
    const { instance } = await WebAssembly.instantiate(bytes, imports);
    return instance?.exports;
  }
}
