import sys
import os
sys.path.append(os.path.abspath("../"))

import io
import torch
import PIL.Image as Image
from classifier_model.model import get_model
from classifier_model.utils import preprocess_image, cifar100_classes
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

# Use GPU if available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load model and move to device
model = get_model(num_classes=100, checkpoint_path="../classifier_model/cifar100_model.pth")
model.to(device)
model.eval()  # set in evaluation mode

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict-image")
async def predict_image(file: UploadFile = File(...)):
    contents = await file.read()
    try:
        pil_image = Image.open(io.BytesIO(contents)).convert('RGB')
    except Exception:
        return {"error": "Invalid image file"}

    # Preprocess and move to device
    image_tensor = preprocess_image(pil_image).to(device)

    with torch.inference_mode():
        outputs = model(image_tensor)
        predicted = outputs.argmax(dim=1)

    class_idx = predicted.item()
    class_name = cifar100_classes[class_idx]

    return {'class_index': class_idx, 'class_name': class_name}
