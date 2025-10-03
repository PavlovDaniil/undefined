from fastapi import APIRouter
from .user import router as user
from .posts import router as posts
from .orders import router as orders
from .test import router as test
routers = APIRouter()

routers.include_router(user)
routers.include_router(posts)
routers.include_router(orders)
routers.include_router(test)
