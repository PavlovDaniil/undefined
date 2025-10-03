from databases.congif import settings
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import aliased
from databases.model.models import Post
from sqlalchemy import select, insert, update, and_
from databases.model.Depends import async_session

async def create_post(
        title: str,
        text: str,
        editor_id: int,
        image_id: int = None,
        tags: str = None
) -> bool:
    async with async_session() as session:
        new_post = Post(title=title, text=text, editor_id=editor_id, image_id=image_id, tags=tags)
        session.add(new_post)
        try:
            await session.commit()
            return True
        except Exception as e:
            await session.rollback()
            print("Ошибка при создании пользователя:", e)
            return False