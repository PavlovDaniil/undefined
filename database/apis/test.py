from fastapi import APIRouter, HTTPException
# from databases.cruts.users import select_user_by_l

router = APIRouter()

@router.get("/hi", tags=["test"])
async def root():
    return {"message": "Hello World"}

@router.get("/bad_request", tags=["test"])
async def bad_request():
    from fastapi import HTTPException
    raise HTTPException(status_code=400, detail="Некорректный запрос")

@router.get("/test/crash", tags=["test"])
async def crash():
    1 / 0

# @router.get("/test_db", tags=["test"])
# async def db():
#     res = await select_user_by_login("trolololo222")
#     return {"sacsses": res}
