from databases.congif import settings
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import DeclarativeBase

engine = create_async_engine(
    url=settings.DATABASE_URL,
    # echo=True
)

async def get_session() -> AsyncSession:
    async with async_session() as session:  # вызываем фабрику async_session()
        yield session  # yield нужен для context manager

async_session = async_sessionmaker(engine)

class Base(DeclarativeBase):
    pass

async def init_models():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
