from pydantic import BaseModel

class NewUser(BaseModel):
    login: str
    name: str
    surname: str|None = None
    password: str
    role: int

class UpdateUser(BaseModel):
    login: str
    name: str
    surname: str
    password: str

class CheckUser(BaseModel):
    uid: int
    login: str
    password: str
