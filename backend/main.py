import logging
from starlette.middleware.cors import CORSMiddleware
from config import logging_config
from fastapi import FastAPI
from apis import routers
from uvicorn import run

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(routers)

logging_config(level=logging.INFO)
logger = logging.getLogger(__name__)
logger.info("Logging configured")


if __name__ == "__main__":
    run(app, host="0.0.0.0", port=3000)