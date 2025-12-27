from rest_framework import authentication, exceptions
from firebase_config import verify_firebase_token, get_firestore_client

class FirebaseAuthentication(authentication.BaseAuthentication):
    """Custom authentication using Firebase tokens"""
    
    def authenticate(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION', '')
        
        if not auth_header.startswith('Bearer '):
            return None
        
        id_token = auth_header.split('Bearer ')[1]
        
        # Verify token with Firebase
        decoded_token = verify_firebase_token(id_token)
        
        if not decoded_token:
            raise exceptions.AuthenticationFailed('Invalid token')
        
        # Get or create user in Firestore
        uid = decoded_token['uid']
        email = decoded_token.get('email', '')
        name = decoded_token.get('name', '')
        
        # Store user info in request
        user = {
            'uid': uid,
            'email': email,
            'name': name,
            'is_authenticated': True
        }
        
        return (user, None)

    def authenticate_header(self, request):
        return 'Bearer'


class FirebaseUser:
    """Mock user object for Firebase authentication"""
    def __init__(self, uid, email, name):
        self.uid = uid
        self.email = email
        self.name = name
        self.is_authenticated = True