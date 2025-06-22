from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import api

app = FastAPI(
    title="FastAPI + SvelteKit App",
    description="SSR対応のFastAPIアプリケーション",
    version="1.0.0"
)

# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # SvelteKit開発サーバー
        "http://localhost:3000",  # SvelteKitプロダクションサーバー
        "http://frontend:3000",   # Docker内部通信
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# APIRouterを含める
app.include_router(api.router)

# ルートエンドポイント
@app.get("/")
async def root():
    return {"message": "FastAPI + SvelteKit Application (SSR)"}
