from fastapi import APIRouter

router = APIRouter()

@router.get("/test")
async def message():
    return {"message": "Hello World"}