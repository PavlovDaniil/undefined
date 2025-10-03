FROM python:3.12-bookworm

COPY --from=ghcr.io/astral-sh/uv:0.7.13 /uv /uvx /bin/

# Установим рабочую директорию
WORKDIR /app

# Скопировать только файлы зависимостей
COPY pyproject.toml uv.lock ./

# Синхронизация зависимостей (без самого проекта — для кэширования слоёв)
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --locked --no-install-project

# Скопировать проект
COPY . .

# Полная установка проекта (уже с самим проектом)
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --locked

# Добавим путь к venv в PATH
# ENV PATH="/app/.venv/bin:$PATH"

EXPOSE 8002

# Запускаем app (замени на свою точку входа)
CMD ["uv", "run", "python", "main.py"]
