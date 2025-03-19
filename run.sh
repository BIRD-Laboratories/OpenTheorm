#!/bin/bash
set -e

# 编译 TypeScript 代码
echo "Compiling TypeScript..."
tsc src/main.ts --outDir dist

# 启动本地 HTTP 服务器（监听 8000 端口）
echo "Starting local server at http://localhost:8000"
npx http-server public -p 8000

# 自动打开浏览器（跨平台兼容）
echo "Opening browser..."
xdg-open http://localhost:8000 || open http://localhost:8000