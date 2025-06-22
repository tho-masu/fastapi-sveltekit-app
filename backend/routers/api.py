from fastapi import APIRouter
from datetime import datetime

router = APIRouter(
    prefix="/api",
    tags=["api"]
)

@router.get("/")
async def hello_world():
    return {"message": "Hello, world!"}

@router.get("/query")
async def get_data():
    return {
        "data": "FastAPIからのデータです", 
        "timestamp": datetime.now().isoformat()
    }

@router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "FastAPI Backend"}
