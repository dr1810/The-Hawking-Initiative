import streamlit as st
from questionaire import questionnaire
st.title("The Hawking Initiative")
st.write("Turning Intention into Action")
tab1, tab2 = st.tabs(["Doctor's Evaluation", "Task"])
with tab1:
    questionnaire()
with tab2:
    st.write("This is the main page")