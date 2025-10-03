from fastapi import APIRouter
from .posts import router as posts

routers = APIRouter()

routers.include_router(posts)
