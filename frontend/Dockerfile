FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# プロダクション用イメージ
FROM node:22-alpine

WORKDIR /app

# package.jsonとnode_modulesをコピー（本番用依存関係）
COPY package*.json ./
RUN npm ci --production

# ビルド結果をコピー
COPY --from=builder /app/build ./build

EXPOSE 3000

# SvelteKitサーバーを起動
CMD ["node", "build"]
