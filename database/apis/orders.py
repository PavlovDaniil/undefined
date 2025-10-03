from fastapi import APIRouter

router = APIRouter()

@router.get("/orders", tags=["orders"])
async def get_orders():
    pass


# @router.get("/pay", tags=["orders"])