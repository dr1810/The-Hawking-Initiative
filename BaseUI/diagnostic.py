from tkinter import *
from UI_functions import Question
from config import *
from diagnostic_classes import *
window = Tk()
window.title("Diagnostic Form")
window.minsize(width=500,height=500)
window.config(background=BACKGROUND_COLOR)
title_label = Label(text="Diagnostic Form",fg=FG,font=FONT)
title_label.grid(column=0,row=0)

def vision_score():
    
    confidence = first.get_value(first.scale.get())
    font_size = second.get_value(second.scale.get())
    contrast = third.get_value(third.scale.get())
    fatigue = fourth.get_value(fourth.scale.get())
    color = fifth.get_value(fifth.scale.get())
    vision_obj = Vision(confidence,font_size,contrast,fatigue,color)
    return vision_obj.vision_score()

def hearing_score():
    detect = first_hear.get_value(first_hear.scale.get())
    noise_comprehension = second_hear.get_value(second_hear.scale.get())
    expression = third_hear.get_value(third_hear.scale.get())
    auditory_comprehension = fourth_hear.get_value(fourth_hear.scale.get())
    communication = fifth_hear.get_value(fifth_hear.scale.get())
    hear_obj = Hearing(detect,noise_comprehension,expression,auditory_comprehension,communication)
    print(hear_obj.hearing_score())
    
#VISION
vision_title_label = Label(text="Questions to analyze vision",fg=FG,font=FONT)
vision_title_label.grid(column=0,row=1)
first = Question("How confident are you reading on-screen text?",0,2,0,3)
second = Question("How difficult is it to read text on a phone or computer?",0,4,0,5)
third = Question("Can you recognize faces across a room?",0,6,0,7)
fourth = Question("How sensitive are you to bright lights?",0,8,0,9)
fifth = Question("Do visual difficulties interfere with daily activities?",0,10,0,11)
vision_button = Button(text="Calculate Score",fg=FG,font=FONT,command=vision_score)
vision_button.grid(column=0,row=12)

#HEARING
hearing_title_label = Label(text="Questions to analyze Hearing and Communication",fg=FG,font=FONT)
hearing_title_label.grid(column=0,row=13)
first_hear = Question("How difficult is it to hear someone speaking in a quiet room?",0,14,0,15)
second_hear = Question("How difficult is it to understand conversations in noisy places?",0,16,0,17)
third_hear = Question("How difficult is it to express your thoughts verbally?",0,18,0,19)
fourth_hear = Question("How difficult is it to understand spoken instructions?",0,20,0,21)
fifth_hear = Question("Do communication difficulties affect your daily life?",0,22,0,23)
hear_button = Button(text="Calculate Hear Score",fg=FG,font=FONT,command=hearing_score)
hear_button.grid(column=0,row=24)

#COGNITIVE ABILITY
cognitive_label = Label(text="Questions to understand cognitive abilities",fg=FG,font=FONT)
cognitive_label.grid(column=1,row=1)
cog_first = Question("How often do you lose focus while learning?",0)
#READING ABILITY

#MOTOR SKILLS
window.mainloop()
