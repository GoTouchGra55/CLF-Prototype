# Use official Python slim image
FROM python:3.12-slim

WORKDIR /app

# Copy requirements and install
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy code
COPY . .

# Expose port for FastAPI
EXPOSE 3000

# Run the app
CMD ["python", "main.py"]
