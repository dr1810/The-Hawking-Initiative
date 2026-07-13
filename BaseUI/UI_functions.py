from tkinter import *
from config import FONT,BACKGROUND_COLOR,FG

class Question:
    def __init__(self,q_text,lab_column,lab_row,scale_column,scale_row):
        self.label = Label(text=q_text,fg=FG,font=FONT)
        self.label.grid(column=lab_column,row=lab_row)
        self.scale = Scale(from_=1,to=5,command=self.get_value,orient=HORIZONTAL)
        self.scale.grid(column=scale_column,row=scale_row)
    def get_value(self,value):
        return value

        
