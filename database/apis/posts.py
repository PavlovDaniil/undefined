from fastapi import APIRouter
from apis.schemas import Post
from databases.cruts.posts import create_post
router = APIRouter(
    prefix="/db/post",   # 👈 автоматически добавится ко всем эндпоинтам
    tags=["post"]     # 👈 тег тоже можно прописать сразу для всех)
)


@router.post("/create")
async def create_new_post(post: Post):
    try:
        await create_post(
            post.title,
            post.text,
            post.image,
            post.editor_id,
            post.tags
        )
        return {"success": True}
    except Exception as e:
        return {"success": False, "error": str(e)}

@router.get("/posts_id/{id}")
async def get_post_by_id(id: int):
    pass

@router.get("/post_tag/{tag}")
async def get_post_tag(tag: str):
    pass

@router.get("/post_name/{name}")
async def get_post_tag(name: str):
    pass

@router.get("/posts")
async def get_posts():
    pass

@router.put("/update_post")
async def update_post(post: Post):
    pass

@router.delete("/post/{id}")
async def delete_post(id: int):
    pass

@router.delete("/post/{name}")
async def delete_post(name: str):
    pass