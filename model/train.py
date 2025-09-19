import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import models, transforms, datasets

data_transforms = {
    "train": transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.RandomHorizontalFlip(),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406],
                             [0.229, 0.224, 0.225])
    ]),
    "val": transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406],
                             [0.229, 0.224, 0.225])
    ]),
}

train_set = datasets.CIFAR100(root="/data", train=True, download=True, transform=data_transforms['train'])
test_set = datasets.CIFAR100(root="/data", train=False, download=True, transform=data_transforms['val'])

train_loader = torch.utils.data.DataLoader(train_set, batch_size=32, shuffle=True)
test_loader = torch.utils.data.DataLoader(test_set, batch_size=32, shuffle=False)

dataloaders = {
    "train": train_loader,
    "val": test_loader
}

classes = train_set.classes

# print(classes)

model = models.resnet18(weights=models.ResNet18_Weights.DEFAULT)

for param in model.parameters():
  param.requires_grad = False

num_feats = model.fc.in_features
model.fc = nn.Linear(num_feats, len(classes))

criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.01)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = model.to(device)

num_epochs = 5
for epoch in range(num_epochs):
    print(f"Epoch {epoch+1}/{num_epochs}")
    print("-" * 10)

    for phase in ["train", "val"]:
        if phase == "train":
            model.train()
            dataloader = train_loader
            dataset_size = len(train_loader.dataset)
        else:
            model.eval()
            dataloader = test_loader
            dataset_size = len(test_loader.dataset)

        running_loss = 0.0
        running_corrects = 0

        for inputs, labels in dataloader:
            inputs, labels = inputs.to(device), labels.to(device)

            optimizer.zero_grad()

            with torch.set_grad_enabled(phase == "train"):
                outputs = model(inputs)
                _, preds = torch.max(outputs, 1)
                loss = criterion(outputs, labels)

                if phase == "train":
                    loss.backward()
                    optimizer.step()

            running_loss += loss.item() * inputs.size(0)
            running_corrects += torch.sum(preds == labels.data)

        epoch_loss = running_loss / dataset_size
        epoch_acc = running_corrects.double() / dataset_size

        print(f"{phase} Loss: {epoch_loss:.4f} Acc: {epoch_acc:.4f}")

torch.save(model.state_dict(), "cifar100_model.pth")