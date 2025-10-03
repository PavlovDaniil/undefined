from fastapi import APIRouter
from .test import router as test
from .users import router as users

routers = APIRouter()

routers.include_router(test)
routers.include_router(users)


