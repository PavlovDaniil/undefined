from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql.schema import ForeignKey
from databases.model.Depends import Base, init_models


class Role(Base):
    __tablename__ = "roles"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, unique=True)
    role: Mapped[str] = mapped_column(unique=True, nullable=False)

    # Связь с пользователями
    users = relationship("User", back_populates="role_obj")

    class Config:
        orm_mode = True

class Order(Base):
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, unique=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    service_id: Mapped[int] = mapped_column(ForeignKey("services.id"), nullable=False)

    # связи
    user = relationship("User", back_populates="orders")
    service = relationship("Service", back_populates="orders")

    class Config:
        orm_mode = True


class Service(Base):
    __tablename__ = "services"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, unique=True)
    name: Mapped[str] = mapped_column(nullable=False)

    # связь
    orders = relationship("Order", back_populates="service")

    class Config:
        orm_mode = True

class Post(Base):
    __tablename__ = "posts"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, unique=True)
    title: Mapped[str] = mapped_column(unique=True, nullable=False)
    text: Mapped[str] = mapped_column(nullable=False)
    image_id: Mapped[int] = mapped_column(nullable=True)
    editor_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=True)
    tags: Mapped[str] = mapped_column(nullable=True)

    # связь
    editor = relationship("User", back_populates="posts")

    class Config:
        orm_mode = True

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    login: Mapped[str] = mapped_column(unique=True, nullable=False)
    name: Mapped[str] = mapped_column(nullable=False)
    surname: Mapped[str] = mapped_column(nullable=True)
    password: Mapped[str] = mapped_column(nullable=False)
    role: Mapped[int] = mapped_column(ForeignKey("roles.id"), nullable=False)

    # связи
    role_obj = relationship("Role", back_populates="users")
    orders = relationship("Order", back_populates="user")
    posts = relationship("Post", back_populates="editor")

    class Config:
        orm_mode = True