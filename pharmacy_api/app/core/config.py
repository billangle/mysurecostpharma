from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://user:password@localhost:5432/pharmacy"
    class Config:
        env_file = ".env"

settings = Settings()
