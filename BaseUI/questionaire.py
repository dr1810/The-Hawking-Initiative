import streamlit as st

def questionnaire():
    st.write("This is to help understand what type of assistance you may need")
    st.write("The first part of this questionnaire is to understand how you may find it to access features on the website")

    first_question = st.multiselect(
        label="1. Do you use a screen reader or other visual accessibility tools?",
        options=[
            "Screen reader",
            "Large text",
            "High contrast",
            "Text-to-speech",
            "Color-blind friendly mode"
        ],
        key="q1"
    )

    second_question = st.multiselect(
        label="2. Would you like the website optimized for screen readers?",
        options=[
            "Keyboard-only navigation",
            "Audio descriptions",
            "Skip navigation links"
        ],
        key="q2"
    )

    third_question = st.multiselect(
        label="3. Would you prefer captions, transcripts, or visual notifications instead of audio alerts?",
        options=[
            "Captions",
            "Transcripts",
            "Visual notifications"
        ],
        key="q3"
    )

    fourth_question = st.multiselect(
        label="4. Do you require alternative input methods or larger controls?",
        options=[
            "Larger buttons",
            "Keyboard navigation",
            "Voice commands",
            "Extended time limits"
        ],
        key="q4"
    )

    fifth_question = st.multiselect(
        label="5. Which interface accessibility features would you find helpful?",
        options=[
            "Reduce animations",
            "Disable autoplay",
            "Consistent layouts",
            "Visual schedules"
        ],
        key="q5"
    )

    sixth_question = st.multiselect(
        label="6. Would reminders and progress-saving features be helpful?",
        options=[
            "Auto-save",
            "Confirmation prompts",
            "Reminders",
            "Breadcrumb navigation"
        ],
        key="q6"
    )

    seventh_question = st.multiselect(
        label="7. Would you like tools to help maintain focus?",
        options=[
            "Reduce distractions",
            "Focus mode",
            "Break tasks into steps",
            "Breadcrumb navigation"
        ],
        key="q7"
    )

    eighth_question = st.multiselect(
        label="8. Which personalization options would you like to enable?",
        options=[
            "Dark mode",
            "Light mode",
            "Larger fonts",
            "Custom color themes"
        ],
        key="q8"
    )