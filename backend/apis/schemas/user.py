from pydantic import BaseModel

class NewUser(BaseModel):
    login: str
    password: str

class UpdateUser(BaseModel):
    login: str
    name: str
    surname: str
    password: str

class CheckUser(BaseModel):
    login: str
    password: str