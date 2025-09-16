import torch
import torch.nn as nn
import torchvision.models as models

def get_model(num_classes=100, checkpoint_path=None):
  model = models.resnet18(weights=None)
  model.fc = nn.Linear(model.fc.in_features, num_classes)

  if checkpoint_path:
    model.load_state_dict(torch.load(checkpoint_path, map_location="cpu"))
    model.eval()
  
  return model