from typing import Any
from fastapi import APIRouter, HTTPException
from apis.schemas import Post
import httpx
import logging

router = APIRouter()
logger = logging.getLogger(__name__)


@router.get("/posts")
async def get_posts():
    pass

@router.get("/posts/{post_id}")
async def get_post(post_id: int):
    pass

@router.get("/four_posts")
async def get_four_posts():
    pass

@router.post("/post")
async def create_post(post: Post) -> dict[str, Any]:
    async with httpx.AsyncClient() as client:
        try:
            res = await client.post(
                "http://back_db:8001/db/post/create",
                json={
                    "title": post.title,
                    "text": post.content,
                    "image": post.image,
                    "editor_id": post.editor_id,
                    "tags": post.tags,
                },
                timeout=10
            )
        except httpx.RequestError:
            raise HTTPException(status_code=500, detail="Database service unreachable")

    res_json = res.json()
    if res.status_code == 200 and res_json.get("success"):
        logger.info("post created")
        return {"success": True}
