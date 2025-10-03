from urllib.request import Request
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from uvicorn import run
from databases.model.Depends import init_models
import apis

app = FastAPI()
app.include_router(apis.routers)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def catch_exceptions_middleware(request: Request, call_next):
    try:
        response = await call_next(request)
        # если статус уже 4xx или 5xx, можем изменить ответ
        if 400 <= response.status_code < 500:
            return JSONResponse(
                status_code=response.status_code,
                content={"error": "Client error"},
            )
        elif 500 <= response.status_code < 600:
            return JSONResponse(
                status_code=response.status_code,
                content={"error": "Server error"},
            )
        return response
    except Exception as e:
        # неожиданные ошибки → 500
        return JSONResponse(
            status_code=500,
            content={"error": "Unexpected server error", "detail": str(e)},
        )

@app.on_event("startup")
async def on_startup():
    await init_models()

if __name__ == "__main__":
    run(app, host="0.0.0.0", port=8001)
