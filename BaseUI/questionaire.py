import streamlit as st
def questionnaire():
    st.write("This is to help understand what type of assistance you may need")
    st.write("The first part of this questionnaire is to understand how you may find it to access features on the website")
    first_question = st.multiselect(
        label = "Do you use a screen reader or other visual accessibility tools?",
        options = ["Screen reader","Large text","High contrast","Text-to-speech","Color-blind friendly mode"]
    )
    second_question = st.multiselect(
        label = "Would you like the website optimized for screen readers?",
        options = ["Keyboard-only navigation", "Audio descriptions", "Skip navigation links"]
    )
    third_question = st.multiselect(
        label = "Would you prefer captions, transcripts, or visual notifications instead of audio alerts?",
        options = ["Captions","Transcripts","Visual notifications"]
    )
    fourth_question = st.multiselect(
        label = "Do you require alternative input methods or larger controls?",
        options = ["Larger buttons","Keyboard navigation","Voice commands","Extended time limits"]
    )
    fifth_question = st.multiselect(
        label = "Would you like sensory-friendly or highly predictable interfaces?",
        options = ["Reduce animations","Disable autoplay","Consistent layouts","Visual schedules"]
    )
    sixth_question = st.multiselect(
        label = "Would reminders and progress-saving features be helpful?",
        options = ["Auto-save","Confirmation prompts","Reminders","Breadcrumb navigation"]
    )
    seventh_question = st.multiselect(
        label = "Would you like tools to help maintain focus?",
        options = ["Reduce distractions","Focus mode","Break tasks into steps","Breadcrumb navigation"]
    )
    eight_question = st.multiselect(
        label = "Would you like sensory-friendly or highly predictable interfaces?",
        options = ["Reduce animations","Disable autoplay","Consistent layouts","Visual schedules"]
    )
    ninth_question = st.multiselect(
        label = "Would reminders and progress-saving features be helpful?",
        options = []
    )
