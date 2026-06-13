from ultralytics import YOLO

model = YOLO("yolov8n.pt")

results = model("images/sample.jpg", save=True)

print("\n===== DETECTED OBJECTS =====\n")

for result in results:
    for box in result.boxes:
        cls = int(box.cls[0])
        conf = float(box.conf[0])

        print(
            f"Object: {result.names[cls]} | Confidence: {conf:.2f}"
        )

print("\n============================\n")