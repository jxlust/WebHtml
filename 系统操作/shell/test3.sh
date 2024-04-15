#!/bin/bash
read name
echo "hello $name"

echo 'const abc = "It is '$name'"' >out_file.js
