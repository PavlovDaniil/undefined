from databases.congif import settings
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import aliased
from databases.model.models import User
from sqlalchemy import select, insert, update, and_
from databases.model.Depends import async_session


async def check_user(user_login: str, password: str) -> None|int:
    async with async_session() as session:
        result = await session.execute(select(User).where(User.login == user_login))
        user = result.scalar_one_or_none()
        
        if user:
            print(user.password, user.login, password, user_login)
            if password == user.password:
                return user.id
        else:
            print("Пользователь не найден:", user_login)
            return None
        
async def create_user(user_login: str, password: str) -> bool:
    async with async_session() as session:
        new_user = User(login=user_login, password=password)
        session.add(new_user)
        try:
            await session.commit()
            return True
        except Exception as e:
            await session.rollback()
            print("Ошибка при создании пользователя:", e)
            return False