from authx import AuthX, AuthXConfig
from logging.config import dictConfig
import logging

#jvt
config = AuthXConfig()
config.JWT_SECRET_KEY = "secret_key"
config.JWT_ACCESS_COOKIE_NAME = "access_token"
config.JWT_TOKEN_LOCATION = ["cookies"]

security = AuthX(config)

#logging
def logging_config(level=logging.INFO, logfile: str = "app.log"):
    dictConfig({
        "version": 1,
        "disable_existing_loggers": False,
        "formatters": {
            "default": {
                "format": "[%(asctime)s.%(msecs)03d] %(levelname)s %(name)s:%(lineno)d - %(message)s",
                "datefmt": "%Y-%m-%d %H:%M:%S",
            },
        },
        "handlers": {
            "console": {
                "level": level,
                "formatter": "default",
                "class": "logging.StreamHandler",
            },
            "file": {
                "level": level,
                "formatter": "default",
                "class": "logging.FileHandler",
                "filename": logfile,
                "mode": "a",  # "w" чтобы каждый запуск перезаписывал
                "encoding": "utf-8"
            },
        },
        "root": {
            "level": level,
            "handlers": ["console", "file"],
        },
        "loggers": {
            "uvicorn": {"level": level},
            "uvicorn.error": {"level": level},
            "uvicorn.access": {"level": level},
        },
    })
