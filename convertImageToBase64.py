import base64

with open("images\enem_2024_t3.webp", "rb") as img_file:
    b64_string = base64.b64encode(img_file.read()).decode("utf-8")
    print(b64_string)
