from logging.config import dictConfig
import logging

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
