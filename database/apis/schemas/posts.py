from typing import List
from pydantic import BaseModel

class Post(BaseModel):
    title: str
    text: str
    image: int | None = None
    editor_id: int
    tags: str | None = None

