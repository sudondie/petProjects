import imutils as imutils
import numpy as np
import matplotlib.pyplot as plt
import cv2
import pytesseract

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
tessdata_dir_config = r'--tessdata-dir "C:\Program Files\Tesseract-OCR\tessdata"'
# Считывание изобржения и конвертация
carplate_img = cv2.imread('./test_Images/0aaabe5ca0317e9793d77c6802c80101.jpg')  # считывание изображения
carplate_img = cv2.resize(carplate_img, (620, 480))  # ресайз изображения
gray = cv2.cvtColor(carplate_img, cv2.COLOR_BGR2GRAY)  # перевод в серый формат
gray = cv2.bilateralFilter(gray, 13, 15, 15)
edged = cv2.Canny(gray, 30, 200)  # Замыливает ненужные детали на изображении
cv2.imshow('edged', edged)
cv2.waitKey(0)
contours = cv2.findContours(edged.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)  # создание контуров прямоугольных объектов
contours = imutils.grab_contours(contours)
contours = sorted(contours, key=cv2.contourArea, reverse=True)[:10]  # сортировка контуров
screenCnt = None
for c in contours:
    peri = cv2.arcLength(c, True)
    approx = cv2.approxPolyDP(c, 0.018 * peri, True)
    if len(approx) == 4:
        screenCnt = approx
        break

# Маскировка деталей которые не являются номером
mask = np.zeros(gray.shape, np.uint8)
new_image = cv2.drawContours(mask, [screenCnt], 0, 255, -1,)
new_image = cv2.bitwise_and(carplate_img, carplate_img, mask=mask)

# Обрезаем итоговое изображение
(x, y) = np.where(mask == 255)
(topx, topy) = (np.min(x), np.min(y))
(bottomx, bottomy) = (np.max(x), np.max(y))
Cropped = new_image[topx:bottomx+1, topy:bottomy+1]

# Импорт Каскадов Хаара для русских номеров(не понадобилось)
# carplate_haar_cascade = cv2.CascadeClassifier('./haarcascade_russian_plate_number.xml')
custom_config = r' --oem 3 --psm 6'
plt.imshow(new_image, cmap='gray')
plt.axis('off')
plt.show()
text = pytesseract.image_to_string(Cropped, lang='rus', config='--psm 11')
print("Распознанный номер:", text)
#
# # Функции для детекции номеров
# def carplate_detect(image):
#     carplate_overlay = image.copy()
#     carplate_rects = carplate_haar_cascade.detectMultiScale(carplate_overlay, scaleFactor=1.2, minNeighbors=3)
#     for x, y, w, h in carplate_rects:
#         cv2.rectangle(carplate_overlay, (x, y), (x + w, y + h), (255, 0, 0), 5)
#     return carplate_overlay
#
#
# detected_carplate_img = carplate_detect(carplate_img)

# # Create function to retrieve only the car plate region itself
# def carplate_extract(image):
#     global carplate_img
#     carplate_rects = carplate_haar_cascade.detectMultiScale(image, scaleFactor=1.1, minNeighbors=5)
#     for x, y, w, h in carplate_rects:
#         carplate_img = image[y + 15:y + h - 10,
#                        x + 15:x + w - 20]  # Adjusted to extract specific region of interest i.e. car license plate
#     return carplate_img
#
#
# # Enlarge image for further processing later on
# def enlarge_img(image, scale_percent):
#     width = int(image.shape[1] * scale_percent / 100)
#     height = int(image.shape[0] * scale_percent / 100)
#     dim = (width, height)
#     resized_image = cv2.resize(image, dim, interpolation=cv2.INTER_AREA)
#     return resized_image
#
#
# # Display extracted car license plate image
# carplate_extract_img = carplate_extract(carplate_img)
# carplate_extract_img = enlarge_img(carplate_extract_img, 150)
#
# # Convert image to grayscale
# carplate_extract_img_gray = cv2.cvtColor(carplate_extract_img, cv2.COLOR_RGB2GRAY)
# # Apply median blur
# # carplate_extract_img_gray_blur = cv2.medianBlur(carplate_extract_img_gray, 3)  # kernel size 3
# plt.imshow(new_image, cmap='gray')
# plt.axis('off')
# plt.show()
# # Display the text extracted from the car plate
# print(pytesseract.image_to_string(new_image, config=custom_config))
