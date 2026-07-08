from tkinter import *

# ----CONSTANTS----
WIDTH = 900
HEIGHT = 700
FLASH = "#FFFAF3"
FONT = ("Arial", 12, "bold")

# -----UI SETUP----------
window = Tk()
window.title("Responsive Task Manager")
window.geometry(f"{WIDTH}x{HEIGHT}")
window.configure(bg=FLASH)

# IMPORTANT: Configure weights for responsiveness
# Weight > 0 allows the row/column to expand
window.grid_columnconfigure(0, weight=1)
window.grid_columnconfigure(1, weight=1)
window.grid_rowconfigure(0, weight=2) # Flashcard area gets more space
window.grid_rowconfigure(1, weight=1)
window.grid_rowconfigure(2, weight=0)
window.grid_rowconfigure(3, weight=0)
window.grid_rowconfigure(4, weight=1)

# 1. Flashcard Section
flash_frame = Frame(window, bg=FLASH)
flash_frame.grid(row=0, column=0, columnspan=2, sticky="nsew")

# Use sticky="nsew" to fill the expanding space
btn_prev = Button(flash_frame, text="<", font=FONT)
btn_prev.pack(side=LEFT, padx=10)

flashcard_canvas = Canvas(flash_frame, bg="white", highlightthickness=1)
flashcard_canvas.pack(side=LEFT, fill=BOTH, expand=True, padx=5, pady=5)
flashcard_canvas.create_text(125, 100, text="Task Flashcard", font=FONT)

btn_next = Button(flash_frame, text=">", font=FONT)
btn_next.pack(side=LEFT, padx=10)

# 2. Video Demo Section
video_canvas = Canvas(window, bg="white", highlightthickness=1)
video_canvas.grid(row=1, column=0, columnspan=2, sticky="nsew", padx=10, pady=5)
video_canvas.create_text(200, 50, text="Task Video Demo", font=FONT)

# 3. Text Prompt Area
task_prompt = Entry(window)
task_prompt.grid(row=2, column=0, columnspan=2, sticky="ew", padx=10, pady=5)
task_prompt.insert(0, "Enter prompt here...")

# 4. Button Bar
btn_frame = Frame(window, bg=FLASH)
btn_frame.grid(row=3, column=0, columnspan=2, pady=5)

generate_flash = Button(btn_frame, text="Generate Flash Cards", font=FONT)
generate_flash.pack(side=LEFT, padx=5)

mindfulness = Button(btn_frame, text="Mindfulness", font=FONT)
mindfulness.pack(side=LEFT, padx=5)

help_btn = Button(btn_frame, text="Help", font=FONT)
help_btn.pack(side=LEFT, padx=5)

# 5. Mindfulness Bubble
mindfulness_help_space = Canvas(window, bg="#D1E8E2", highlightthickness=0)
mindfulness_help_space.grid(row=4, column=0, columnspan=2, sticky="nsew", padx=10, pady=10)
mindfulness_help_space.create_text(225, 40, text="Mindfulness Bubble Space", font=FONT)

window.mainloop()