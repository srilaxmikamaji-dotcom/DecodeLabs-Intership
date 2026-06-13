import cv2
import pytesseract
from ultralytics import YOLO

# Tesseract Path
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# Image Path
image_path = "images/sample.jpg"

# OCR
image = cv2.imread(image_path)
text = pytesseract.image_to_string(image)

print("\n===== OCR TEXT =====\n")
print(text)

# Object Detection
print("\n===== DETECTED OBJECTS =====\n")

model = YOLO("yolov8n.pt")
results = model(image_path, save=True)

for result in results:
    for box in result.boxes:
        cls = int(box.cls[0])
        conf = float(box.conf[0])

        print(
            f"Object: {result.names[cls]} | Confidence: {conf:.2f}"
        )

print("\n===== PROCESS COMPLETED =====")