# Firebase Service Account Setup

## Local Development

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `satoru-c9658`
3. Go to **Project Settings** → **Service Accounts**
4. Click **"Generate New Private Key"**
5. Download the JSON file
6. Rename it to `firebase-service-account.json`
7. Place it in the `backend/` directory (same level as manage.py)
8. **IMPORTANT**: This file is in `.gitignore` - never commit it!

## Production (Render)

1. Open the downloaded service account JSON file
2. Copy the entire JSON content
3. In Render Dashboard:
   - Go to your web service
   - Environment Variables
   - Add: `FIREBASE_SERVICE_ACCOUNT` = (paste the entire JSON as a string)
4. Restart the service

## Firestore Security Rules

In Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Documents collection
    match /documents/{documentId} {
      allow read: if request.auth != null && resource.data.user_id == request.auth.uid;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && resource.data.user_id == request.auth.uid;
    }
    
    // Summaries collection
    match /summaries/{documentId} {
      allow read: if request.auth != null;
    }
    
    // Flashcards collection
    match /flashcards/{flashcardId} {
      allow read: if request.auth != null;
    }
  }
}