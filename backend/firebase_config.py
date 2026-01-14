import firebase_admin
from firebase_admin import credentials, auth, firestore, storage
import os
import json

def initialize_firebase():
    """Initialize Firebase Admin SDK"""
    try:
        # Check if already initialized
        firebase_admin.get_app()
        print("✓ Firebase already initialized")
        return
    except ValueError:
        pass  # Not initialized yet, continue
    
    try:
        # Check if we're on Render or production environment
        is_production = os.getenv("RENDER") == "True" or os.getenv("RAILWAY_ENVIRONMENT")
        
        if is_production:
            # Production: use environment variable with JSON string
            cred_json = os.getenv('FIREBASE_SERVICE_ACCOUNT')
            if not cred_json:
                raise Exception("FIREBASE_SERVICE_ACCOUNT environment variable not set")
            
            print("Loading Firebase credentials from environment variable...")
            cred_dict = json.loads(cred_json)
            cred = credentials.Certificate(cred_dict)
        else:
            # Local development: use JSON file
            cred_path = os.path.join(os.path.dirname(__file__), 'firebase-service-account.json')
            if not os.path.exists(cred_path):
                raise Exception(f"firebase-service-account.json not found at {cred_path}")
            
            print("Loading Firebase credentials from local file...")
            cred = credentials.Certificate(cred_path)
        
        firebase_admin.initialize_app(cred, {
            'storageBucket': 'satoru-c9658.firebasestorage.app'
        })
        print("✓ Firebase Admin SDK initialized successfully")
        
    except Exception as e:
        print(f"✗ Firebase initialization error: {str(e)}")
        raise

# Initialize on import
initialize_firebase()

# Export Firebase services
def get_firestore_client():
    """Get Firestore client"""
    return firestore.client()

def get_storage_bucket():
    """Get Storage bucket"""
    return storage.bucket()

def verify_firebase_token(id_token):
    """Verify Firebase ID token"""
    try:
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token
    except Exception as e:
        print(f"Token verification error: {str(e)}")
        return None