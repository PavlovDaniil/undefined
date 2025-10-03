import logging
import httpx
from authx.schema import TokenPayload
from authx import AuthXConfig
from datetime import datetime, timedelta
from fastapi import APIRouter, HTTPException, Response, Request
from apis.schemas import UpdateUser, CheckUser, NewUser
from config import security, config

router = APIRouter(tags=["user"])
logger = logging.getLogger(__name__)

@router.post("/auth/login")
async def login(user: CheckUser, response: Response):
    async with httpx.AsyncClient() as client:
        try:
            res = await client.post(
                "http://back_db:8001/db/auth/login",
                json={"login": user.login, "password": user.password},
                timeout=10
            )
        except httpx.RequestError:
            raise HTTPException(status_code=500, detail="Database service unreachable")

    res_json = res.json()
    if res.status_code == 200 and res_json.get("success"):
        payload = {
            "uid": res_json.get("uid"),
            "login": "editor",
            "role": "editor",
            "iat": datetime.now(),
            "exp": datetime.now() + timedelta(days=7)  # Токен действует 7 дней
        }
        token = TokenPayload().encode(
            key="12345",
            algorithm=config.JWT_ALGORITHM,
            data=payload_data
        )
        response.set_cookie(config.JWT_ACCESS_COOKIE_NAME, token)
        logger.info("Login successful for user %s", user.login)
        return {"accessToken": token, "user": {"role": "editor"}}

    logger.warning("Login failed for user %s", user.login)
    raise HTTPException(status_code=401, detail="Invalid login")

@router.get("/auth/me")
async def get_current_user(request: Request):
    """Получить информацию о текущем пользователе по токену из cookie"""
    try:
        # AuthX автоматически проверяет токен из cookie и возвращает пользователя
        current_user = security.get_current_subject(request)
        return {"id": current_user.get("uid", "12345"), "login": "editor", "role": "editor"}
    except Exception as e:
        logger.warning("Token validation failed: %s", str(e))
        raise HTTPException(status_code=401, detail="Invalid or expired token")

