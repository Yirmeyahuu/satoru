import firebase_admin
from firebase_admin import credentials, auth, firestore, storage
import os
import json

def initialize_firebase():
    """Initialize Firebase Admin SDK"""
    try:
        # Check if already initialized
        firebase_admin.get_app()
        print("Firebase already initialized")
    except ValueError:
        # Initialize Firebase
        if os.getenv("RENDER") == "True":
            # On Render, use environment variable with JSON string
            cred_json = os.getenv('FIREBASE_SERVICE_ACCOUNT')
            if cred_json:
                cred_dict = json.loads(cred_json)
                cred = credentials.Certificate(cred_dict)
            else:
                raise Exception("FIREBASE_SERVICE_ACCOUNT not found in environment")
        else:
            # Local development - use JSON file
            cred_path = os.path.join(os.path.dirname(__file__), 'firebase-service-account.json')
            if os.path.exists(cred_path):
                cred = credentials.Certificate(cred_path)
            else:
                raise Exception("firebase-service-account.json not found")
        
        firebase_admin.initialize_app(cred, {
            'storageBucket': 'satoru-c9658.firebasestorage.app'
        })
        print("✓ Firebase Admin SDK initialized successfully")

# Initialize on import
try:
    initialize_firebase()
except Exception as e:
    print(f"✗ Firebase initialization error: {str(e)}")

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