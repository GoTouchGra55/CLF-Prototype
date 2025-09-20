import io
import torch
from PIL import Image
from app.models.model import get_model
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from app.utils.utils import preprocess_image, cifar100_classes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = get_model(checkpoint_path="../model/cifar100_model.pth")
model.eval()

@app.get("/")
async def root():
  return {"message": "Classifier-V1"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
  data = await file.read()

  try:
    pil_image = Image.open(io.BytesIO(data)).convert("RGB")
  except Exception:
    return {"error": "Invalid file"}
  
  image_tensor = preprocess_image(pil_image)

  with torch.inference_mode():
    output = model(image_tensor)
    prediction = output.argmax(dim=1)

  class_idx = prediction.item()
  class_name = cifar100_classes[class_idx]

  return {"class_name": class_name}