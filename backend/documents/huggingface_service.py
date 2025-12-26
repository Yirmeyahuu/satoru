import requests
import json
from typing import List, Dict
from PyPDF2 import PdfReader
import os


class HuggingFaceService:
    """Service for interacting with deployed Hugging Face model"""
    
    def __init__(self):
        self.api_url = "https://yirmeyahudev-satoru-ai-deploy.hf.space"
        print(f"Initializing Hugging Face service with URL: {self.api_url}")
    
    def extract_text_from_pdf(self, file_path: str) -> tuple[str, int]:
        """
        Extract text from PDF file
        Returns: (extracted_text, page_count)
        """
        try:
            print(f"Extracting text from: {file_path}")
            
            if not os.path.exists(file_path):
                raise Exception(f"File not found: {file_path}")
            
            reader = PdfReader(file_path)
            page_count = len(reader.pages)
            print(f"PDF has {page_count} pages")
            
            text = ""
            for i, page in enumerate(reader.pages):
                try:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + "\n"
                        print(f"Extracted page {i+1}/{page_count} - {len(page_text)} chars")
                except Exception as page_error:
                    print(f"ERROR extracting page {i+1}: {str(page_error)}")
                    continue
            
            if not text.strip():
                raise Exception("No text could be extracted from the PDF")
            
            print(f"Total text extracted: {len(text)} characters")
            return text.strip(), page_count
            
        except Exception as e:
            print(f"ERROR extracting text from PDF: {str(e)}")
            raise Exception(f"Error extracting text from PDF: {str(e)}")
    
    def generate_summary(self, text: str) -> Dict:
        """
        Generate summary using Hugging Face model
        """
        print(f"Generating summary for {len(text)} characters of text")
        
        # Limit text to avoid token limits
        text_sample = text[:4000]  # Adjust based on your model's limits
        
        try:
            print("Calling Hugging Face API for summary...")
            response = requests.post(
                f"{self.api_url}/summarize",
                json={"text": text_sample},
                timeout=60
            )
            response.raise_for_status()
            
            result = response.json()
            print("Summary generated successfully")
            
            # Format response to match expected structure
            return {
                "summary": result.get("summary", ""),
                "key_points": result.get("key_points", []),
                "insights": result.get("insights", []),
                "examples": result.get("examples", [])
            }
            
        except requests.exceptions.RequestException as e:
            print(f"ERROR calling Hugging Face API: {str(e)}")
            raise Exception(f"Error generating summary: {str(e)}")
    
    def generate_flashcards(self, text: str, count: int = 20) -> List[Dict]:
        """
        Generate flashcards using Hugging Face model
        """
        if count < 10:
            count = 10
        elif count > 40:
            count = 40
        
        print(f"Generating {count} flashcards from {len(text)} characters")
        
        # Limit text
        text_sample = text[:4000]
        
        try:
            print("Calling Hugging Face API for flashcards...")
            response = requests.post(
                f"{self.api_url}/generate-qa",
                json={"text": text_sample, "num_questions": count},
                timeout=60
            )
            response.raise_for_status()
            
            result = response.json()
            flashcards = result.get("qa_pairs", [])
            
            print(f"Received {len(flashcards)} flashcards from API")
            
            # Format flashcards to match expected structure
            formatted_flashcards = []
            for card in flashcards:
                formatted_flashcards.append({
                    "question": card.get("question", ""),
                    "answer": card.get("answer", ""),
                    "difficulty": "medium"  # Default difficulty
                })
            
            # Ensure we have the right number
            if len(formatted_flashcards) < count:
                print(f"WARNING: Only got {len(formatted_flashcards)} flashcards")
            elif len(formatted_flashcards) > count:
                formatted_flashcards = formatted_flashcards[:count]
            
            print(f"Returning {len(formatted_flashcards)} flashcards")
            return formatted_flashcards
            
        except requests.exceptions.RequestException as e:
            print(f"ERROR calling Hugging Face API: {str(e)}")
            raise Exception(f"Error generating flashcards: {str(e)}")


# Create singleton instance
try:
    huggingface_service = HuggingFaceService()
    print("✓ Hugging Face service initialized successfully")
except Exception as e:
    print(f"✗ CRITICAL ERROR: Failed to initialize Hugging Face service: {str(e)}")
    huggingface_service = None