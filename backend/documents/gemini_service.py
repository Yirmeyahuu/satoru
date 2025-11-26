import google.generativeai as genai
import os
import json
from PyPDF2 import PdfReader
from typing import List, Dict
import io


class GeminiService:
    """Service for interacting with Google Gemini AI"""
    
    def __init__(self):
        api_key = os.getenv('GEMINI_API_KEY')
        if not api_key:
            print("ERROR: GEMINI_API_KEY not found in environment variables")
            raise ValueError("GEMINI_API_KEY not found in environment variables")
        
        print(f"Initializing Gemini with API key: {api_key[:10]}...")
        
        try:
            genai.configure(api_key=api_key)
            # Use gemini-2.0-flash-exp - it's fast, reliable, and widely available
            self.model = genai.GenerativeModel('gemini-2.0-flash')
            print("Gemini model initialized successfully with gemini-2.0-flash-exp")
        except Exception as e:
            print(f"ERROR initializing Gemini: {str(e)}")
            raise
    
    def extract_text_from_pdf(self, file_path: str) -> tuple[str, int]:
        """
        Extract text from PDF file
        Returns: (extracted_text, page_count)
        """
        try:
            print(f"Extracting text from: {file_path}")
            
            # Check if file exists
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
                    else:
                        print(f"WARNING: Page {i+1} is empty or couldn't be extracted")
                except Exception as page_error:
                    print(f"ERROR extracting page {i+1}: {str(page_error)}")
                    continue
            
            if not text.strip():
                raise Exception("No text could be extracted from the PDF. The PDF might be image-based or encrypted.")
            
            print(f"Total text extracted: {len(text)} characters")
            return text.strip(), page_count
            
        except Exception as e:
            print(f"ERROR extracting text from PDF: {str(e)}")
            raise Exception(f"Error extracting text from PDF: {str(e)}")
    
    def generate_summary(self, text: str) -> Dict:
        """
        Generate summary, key points, insights, and examples from text
        """
        print(f"Generating summary for {len(text)} characters of text")
        
        # Limit text to avoid token limits
        text_sample = text[:20000]  # Increased from 15000
        
        prompt = f"""
        Analyze the following document and provide a JSON response with:
        1. A comprehensive summary (2-3 paragraphs)
        2. Key points (5-7 bullet points)
        3. Important insights (3-5 insights)
        4. Practical examples with explanations (2-3 examples)

        Response format (must be valid JSON):
        {{
            "summary": "your summary here",
            "key_points": ["point 1", "point 2", "point 3"],
            "insights": ["insight 1", "insight 2", "insight 3"],
            "examples": [
                {{"title": "Example Title", "description": "Example description", "code": "optional code"}}
            ]
        }}

        Document text:
        {text_sample}
        """
        
        try:
            print("Calling Gemini API for summary...")
            response = self.model.generate_content(prompt)
            print("Gemini API response received")
            
            if not response or not response.text:
                raise Exception("Empty response from Gemini API")
            
            # Extract JSON from response
            response_text = response.text.strip()
            print(f"Response text preview: {response_text[:200]}...")
            
            # Remove markdown code blocks if present
            if response_text.startswith('```json'):
                response_text = response_text[7:]
            if response_text.startswith('```'):
                response_text = response_text[3:]
            if response_text.endswith('```'):
                response_text = response_text[:-3]
            
            response_text = response_text.strip()
            
            result = json.loads(response_text)
            print("Summary generated successfully")
            return result
            
        except json.JSONDecodeError as e:
            print(f"ERROR: JSON decode failed: {str(e)}")
            print(f"Response text was: {response_text[:500] if 'response_text' in locals() else 'N/A'}")
            # Fallback if JSON parsing fails
            return {
                "summary": response.text[:1000] if 'response' in locals() and hasattr(response, 'text') else "Summary generation failed - could not parse response",
                "key_points": ["Unable to extract key points"],
                "insights": ["Unable to extract insights"],
                "examples": []
            }
        except Exception as e:
            print(f"ERROR generating summary: {str(e)}")
            import traceback
            traceback.print_exc()
            raise Exception(f"Error generating summary: {str(e)}")
    
    def generate_flashcards(self, text: str, count: int = 20) -> List[Dict]:
        """
        Generate flashcards from document text
        count: number of flashcards to generate (10-40)
        """
        if count < 10:
            count = 10
        elif count > 40:
            count = 40
        
        print(f"Generating {count} flashcards from {len(text)} characters of text")
        
        # Limit text to avoid token limits
        text_sample = text[:20000]
        
        prompt = f"""
        Create exactly {count} educational flashcards from the following document.
        
        Requirements:
        - Generate exactly {count} flashcards
        - Questions should test understanding
        - Answers should be clear and concise
        - Mix of easy, medium, and hard difficulty
        - Cover different topics from the document
        
        Response format (must be valid JSON array):
        [
            {{"question": "question text", "answer": "answer text", "difficulty": "easy"}},
            {{"question": "question text", "answer": "answer text", "difficulty": "medium"}},
            {{"question": "question text", "answer": "answer text", "difficulty": "hard"}}
        ]

        Document text:
        {text_sample}
        """
        
        try:
            print("Calling Gemini API for flashcards...")
            response = self.model.generate_content(prompt)
            print("Gemini API response received")
            
            if not response or not response.text:
                raise Exception("Empty response from Gemini API")
            
            response_text = response.text.strip()
            print(f"Response text preview: {response_text[:200]}...")
            
            # Remove markdown code blocks if present
            if response_text.startswith('```json'):
                response_text = response_text[7:]
            if response_text.startswith('```'):
                response_text = response_text[3:]
            if response_text.endswith('```'):
                response_text = response_text[:-3]
            
            response_text = response_text.strip()
            
            flashcards = json.loads(response_text)
            print(f"Parsed {len(flashcards)} flashcards from response")
            
            # Validate flashcard structure
            validated_flashcards = []
            for card in flashcards:
                if isinstance(card, dict) and 'question' in card and 'answer' in card:
                    validated_flashcards.append({
                        "question": str(card.get('question', '')),
                        "answer": str(card.get('answer', '')),
                        "difficulty": card.get('difficulty', 'medium')
                    })
            
            # Ensure we have the right number of flashcards
            if len(validated_flashcards) < count:
                print(f"WARNING: Only got {len(validated_flashcards)} flashcards, padding to {count}")
                while len(validated_flashcards) < count:
                    validated_flashcards.append({
                        "question": f"Review question {len(validated_flashcards) + 1}",
                        "answer": "Please review the document for more details",
                        "difficulty": "medium"
                    })
            elif len(validated_flashcards) > count:
                validated_flashcards = validated_flashcards[:count]
            
            print(f"Returning {len(validated_flashcards)} validated flashcards")
            return validated_flashcards
            
        except json.JSONDecodeError as e:
            print(f"ERROR: JSON decode failed for flashcards: {str(e)}")
            print(f"Response text was: {response_text[:500] if 'response_text' in locals() else 'N/A'}")
            # Fallback flashcards if JSON parsing fails
            return [
                {
                    "question": f"Question {i+1} from document",
                    "answer": "Please review the document for this answer",
                    "difficulty": "medium"
                }
                for i in range(count)
            ]
        except Exception as e:
            print(f"ERROR generating flashcards: {str(e)}")
            import traceback
            traceback.print_exc()
            raise Exception(f"Error generating flashcards: {str(e)}")


# Create singleton instance
try:
    gemini_service = GeminiService()
    print("✓ Gemini service initialized successfully")
except Exception as e:
    print(f"✗ CRITICAL ERROR: Failed to initialize Gemini service: {str(e)}")
    gemini_service = None