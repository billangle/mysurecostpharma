FROM public.ecr.aws/docker/library/python:3.11-slim

WORKDIR /app

COPY ../../../pharmacy_api/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ../../../pharmacy_api/app /app/app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]
