FROM node:22-alpine AS builder

WORKDIR /app

# package.jsonを先にコピー（キャッシュ効率化）
COPY package*.json ./
RUN npm ci

# ソースコードをコピー
COPY . .

# ビルド実行
RUN npm run build

# 本番環境用イメージ
FROM nginx:alpine

# ビルド結果をコピー
COPY --from=builder /app/build /usr/share/nginx/html

# Nginxの設定（SPA用）
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
