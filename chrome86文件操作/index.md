### 选择文件，获取文件句柄

```javascript
btn.addEventListener('click', async (e) => {
  try {
    const hFiles = await window.showOpenFilePicker({
      types: [
        {
          description: '文本文件',
          accept: {
            'text/plain': ['.txt'],
          },
        },
      ],
    })
    if (!hFiles || !hFiles.length) return
    const hFile = hFiles[0]
    l(hFile)
  } catch (error) {
    console.error(error)
  }
})
```

### 从文件句柄中获取文件的内容

```javascript
const file = await hFile.getFile()
const r = new FileReader()
r.readAsText(file)
r.onload = (e) => {
  const fileData = e.target.result
  l(fileData)
}

// or

l(await file.text())
l(await file.arrayBuffer())
l(await file.stream().getReader().read())
```

### 使用文件句柄写入内容

```javascript
const w$ = await hFile.createWritable()
await w$.write('hello ')
await w$.write('world')
await w$.close()
```

### 使用 showSaveFilePicker

```javascript
const hFile = await window.showSaveFilePicker()
const w = await hFile.createWritable()
await w.write('new data')
await w.close()
```

### 打开目录

```javascript
const hDir = await window.showDirectoryPicker()

// 打印文件名，和类型
for await (const it of hDir.values()) {
  l('[[ %s ]] is %s', it.name, it.kind)
}

// 打印文件名和句柄
for await (const [name, handle] of hDir) {
  l(name, handle)
}
```

### 在目录句柄中创建一个新的目录(名叫"NewDir"的目录)，返回新创建目录的句柄

```
const hNewDir = await hDir.getDirectoryHandle("NewDir", {
create: true,
});
```

### 在目录句柄中创建一个新的文件(名叫"newFile.txt"的文件)，返回新创建文件的句柄

```
const hNewFile = await hDir.getFileHandle("newFile.txt", {
create: true,
});
```

### 往新创建的文件中写入内容

```
const w$ = await hNewFile.createWritable();
          await w$.write('在新创建的文件中写入内容');
await w\$.close();
```

### 遍历整个目录

```
const scanDir = async (root, hDir) => {
for await (const [name, handle] of hDir) {
const path = await root.resolve(handle);

              if (handle instanceof FileSystemDirectoryHandle) {
                l("./%s/", path.join("/"));
                scanDir(root, handle);
              } else l("./%s", path.join("/"));
            }
          };
          scanDir(hDir, hDir);
```

### 删除目录中指定的文件

```
await hDir.removeEntry('newFile.txt');
```

### 在目录中递归删除子目录

```
await hDir.removeEntry("Debug", { recursive: true });
```
