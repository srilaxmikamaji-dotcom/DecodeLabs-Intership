# AI-Based Text Extraction and Object Detection from Images

## Project Overview

This project is an AI-powered image analysis system developed using Python. It combines Optical Character Recognition (OCR) and Object Detection to extract text from images and identify objects with confidence scores.

## Features

* Extract text from images using Tesseract OCR
* Detect multiple objects using YOLOv8
* Display object confidence scores
* Save processed images with bounding boxes
* Analyze different image types

## Technologies Used

* Python
* OpenCV
* Tesseract OCR
* YOLOv8 (Ultralytics)
* NumPy

## Project Structure

AI_smart_image_recognition/

├── images/

├── runs/

├── main.py

├── ocr.py

├── object_detection.py

├── yolov8n.pt

└── README.md

## Installation

1. Install Python 3.x
2. Install required packages:

pip install opencv-python pytesseract pillow numpy ultralytics

3. Install Tesseract OCR and update the path in the code if required.

## Usage

Run the main program:

python main.py

## Output

The program performs:

1. Text extraction from images using OCR
2. Object detection using YOLOv8
3. Display of confidence scores
4. Saving annotated images with bounding boxes

Detected images are automatically saved in the `runs/detect/` directory.

## Example Results

OCR Output:

* FOCUS
* DISCIPLINE
* SUCCESS

Detected Objects:

* Person
* Laptop
* Dog
* Cup
* Bottle
* Cell Phone
* Book

## Author

Internship Project - Image Recognition System Using OCR and YOLOv8

