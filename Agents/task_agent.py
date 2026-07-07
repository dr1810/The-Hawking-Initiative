import os
from google.adk.agents import Agent
from google.adk.models.google_llm import Gemini
from google.adk.runners import InMemoryRunner
from dotenv import load_dotenv
from google.adk.tools import google_search
load_dotenv()

api_key = os.environ.get("GOOGLE_API_KEY")



