from fastapi import APIRouter
from apis.schemas import UpdateUser, CheckUser
from databases.cruts.users import check_user, create_user

router = APIRouter(
    prefix="/db/auth",   # 👈 автоматически добавится ко всем эндпоинтам
    tags=["user"]     # 👈 тег тоже можно прописать сразу для всех
)

@router.get("/user")
async def get_user():
    pass

@router.post("/login")
async def get_user(user: CheckUser):
    result = await check_user(user.login, user.password)
    return {
        "uid": user.id,
        "success": True if result else False
    }

@router.put("/user")
async def update_user(User: UpdateUser):
    result = create_user(User.login, User.password)
    return {"success": result}

@router.delete("/user/{name}")
async def delete_userUser(user: str):
    pass