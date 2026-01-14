import requests
import json
from typing import List, Dict
from PyPDF2 import PdfReader
import os


class HuggingFaceService:
    """Service for interacting with deployed Hugging Face model"""
    
    def __init__(self):
        # Load from environment variable, fallback to localhost for testing
        self.api_url = os.getenv('HF_API_URL', 'http://localhost:7860')
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
    
    def generate_summary_from_file(self, file_path: str) -> Dict:
        """
        Generate summary by uploading PDF file to Hugging Face
        """
        print(f"Generating summary from file: {file_path}")
        
        try:
            # TEMPORARY: Extract text first and send as JSON instead of file
            text, _ = self.extract_text_from_pdf(file_path)
            
            # Limit text to avoid overwhelming the model
            text_sample = text[:8000]  # First 8000 characters
            
            print(f"Sending {len(text_sample)} characters to HF for summarization")
            
            # Send as JSON instead of file upload
            response = requests.post(
                f"{self.api_url}/api/v1/summarize",  # Changed endpoint
                json={"text": text_sample},  # Send as JSON
                timeout=120
            )
            
            print(f"HF Response Status: {response.status_code}")
            print(f"HF Response: {response.text[:1000]}")
            
            if response.status_code != 200:
                raise Exception(f"HF API returned status {response.status_code}: {response.text}")
            
            result = response.json()
            print("Summary generated successfully")
            
            # Extract structured data from response
            summary_text = result.get("summary", "")
            
            # Parse key points, insights, examples if available
            # Otherwise create basic structure
            return {
                "summary": summary_text,
                "key_points": result.get("key_points", []),
                "insights": result.get("insights", []),
                "examples": result.get("examples", [])
            }
            
        except requests.exceptions.Timeout:
            print(f"ERROR: Request timed out after 120 seconds")
            raise Exception("Request to Hugging Face service timed out")
        except requests.exceptions.ConnectionError as e:
            print(f"ERROR: Could not connect to Hugging Face service: {str(e)}")
            raise Exception(f"Could not connect to Hugging Face service at {self.api_url}")
        except requests.exceptions.RequestException as e:
            print(f"ERROR calling Hugging Face API: {str(e)}")
            if hasattr(e, 'response') and e.response is not None:
                print(f"Response content: {e.response.text}")
            raise Exception(f"Error generating summary from file: {str(e)}")
        except json.JSONDecodeError as e:
            print(f"ERROR: Invalid JSON response from Hugging Face: {str(e)}")
            raise Exception("Invalid response format from Hugging Face service")
    
    def generate_reviewer(self, file_path: str) -> Dict:
        """
        Generate comprehensive reviewer from PDF file
        """
        print(f"Generating reviewer from file: {file_path}")
        
        try:
            with open(file_path, 'rb') as f:
                files = {'file': (os.path.basename(file_path), f, 'application/pdf')}
                
                print(f"Uploading PDF to Hugging Face for reviewer generation")
                response = requests.post(
                    f"{self.api_url}/api/v1/review-document",
                    files=files,
                    timeout=180
                )
                
                print(f"HF Response Status: {response.status_code}")
                print(f"HF Response: {response.text[:1000]}")
                
                if response.status_code != 200:
                    raise Exception(f"HF API returned status {response.status_code}: {response.text}")
                
                result = response.json()
                review_data = result.get('review', {})
                
                print("Reviewer generated successfully")
                
                return {
                    "title": review_data.get("title", ""),
                    "overview": review_data.get("overview", ""),
                    "sections": review_data.get("sections", []),
                    "key_takeaways": review_data.get("key_takeaways", [])
                }
                
        except requests.exceptions.Timeout:
            print(f"ERROR: Reviewer request timed out after 180 seconds")
            raise Exception("Reviewer request timed out")
        except requests.exceptions.ConnectionError as e:
            print(f"ERROR: Could not connect to Hugging Face service: {str(e)}")
            raise Exception(f"Could not connect to Hugging Face service")
        except requests.exceptions.RequestException as e:
            print(f"ERROR calling Hugging Face API: {str(e)}")
            if hasattr(e, 'response') and e.response is not None:
                print(f"Response content: {e.response.text}")
            raise Exception(f"Error generating reviewer: {str(e)}")
        except json.JSONDecodeError as e:
            print(f"ERROR: Invalid JSON response: {str(e)}")
            raise Exception("Invalid response format from Hugging Face service")
    
    def generate_flashcards(self, text: str, count: int = 20) -> List[Dict]:
        """
        Generate flashcards using Hugging Face model
        """
        if count < 10:
            count = 10
        elif count > 40:
            count = 40
        
        print(f"Generating {count} flashcards from {len(text)} characters")
        
        # Limit text to avoid token limits
        text_sample = text[:4000]
        
        try:
            print("Calling Hugging Face API for flashcards...")
            response = requests.post(
                f"{self.api_url}/api/v1/generate-qa",
                json={"text": text_sample, "num_questions": count},
                timeout=60
            )
            
            print(f"HF Response Status: {response.status_code}")
            print(f"HF Response: {response.text[:500]}")
            
            if response.status_code != 200:
                raise Exception(f"HF API returned status {response.status_code}: {response.text}")
            
            result = response.json()
            flashcards = result.get("qa_pairs", [])
            
            print(f"Received {len(flashcards)} flashcards from API")
            
            # Format flashcards to match expected structure
            formatted_flashcards = []
            for card in flashcards:
                formatted_flashcards.append({
                    "question": card.get("question", ""),
                    "answer": card.get("answer", ""),
                    "difficulty": "medium"
                })
            
            # Ensure we have the right number
            if len(formatted_flashcards) < count:
                print(f"WARNING: Only got {len(formatted_flashcards)} flashcards")
            elif len(formatted_flashcards) > count:
                formatted_flashcards = formatted_flashcards[:count]
            
            print(f"Returning {len(formatted_flashcards)} flashcards")
            return formatted_flashcards
            
        except requests.exceptions.Timeout:
            print(f"ERROR: Flashcard request timed out after 60 seconds")
            raise Exception("Flashcard generation timed out")
        except requests.exceptions.ConnectionError as e:
            print(f"ERROR: Could not connect to Hugging Face service: {str(e)}")
            raise Exception(f"Could not connect to Hugging Face service")
        except requests.exceptions.RequestException as e:
            print(f"ERROR calling Hugging Face API: {str(e)}")
            if hasattr(e, 'response') and e.response is not None:
                print(f"Response content: {e.response.text}")
            raise Exception(f"Error generating flashcards: {str(e)}")
        except json.JSONDecodeError as e:
            print(f"ERROR: Invalid JSON response: {str(e)}")
            raise Exception("Invalid response format from Hugging Face service")


# Create singleton instance
try:
    huggingface_service = HuggingFaceService()
    print("✓ Hugging Face service initialized successfully")
except Exception as e:
    print(f"✗ CRITICAL ERROR: Failed to initialize Hugging Face service: {str(e)}")
    huggingface_service = None