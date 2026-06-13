import cv2
import pytesseract

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

image = cv2.imread("images/sample.jpg")

text = pytesseract.image_to_string(image)

print("\n===== DETECTED TEXT =====\n")
print(text)
print("\n=========================\n")