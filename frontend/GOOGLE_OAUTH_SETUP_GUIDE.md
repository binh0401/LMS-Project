# Google OAuth Setup Guide for LMS Project

This guide will walk you through implementing Google sign-in and sign-up for your LMS project.

## 🚀 Quick Start

### 1. Google Cloud Console Setup

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create or select a project**
3. **Enable Google+ API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. **Create OAuth 2.0 credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:5173` (for development)
     - `https://yourdomain.com` (for production)
5. **Copy your Client ID** - you'll need this for the frontend

### 2. Frontend Configuration

1. **Set up environment variables**:
   Create a `.env.local` file in your frontend root directory:

   ```env
   VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
   VITE_API_BASE_URL=http://localhost:8080
   ```

2. **Install dependencies** (already done):

   ```bash
   npm install google-auth-library
   ```

3. **The following files have been created/updated**:
   - ✅ `src/services/api/googleAuth.js` - Google OAuth service
   - ✅ `src/components/auth/GoogleAuthButton.jsx` - Reusable Google auth button
   - ✅ `src/context/AuthContext.jsx` - Updated with Google OAuth functions
   - ✅ `src/pages/auth/SignInForm.jsx` - Updated with Google sign-in
   - ✅ `src/pages/auth/SignUpForm.jsx` - Updated with Google sign-up

### 3. Backend Implementation

Follow the detailed backend requirements in `GOOGLE_OAUTH_BACKEND_REQUIREMENTS.md`.

**Key backend endpoints needed**:

- `POST /auth/google/signin` - Handle Google sign-in
- `POST /auth/google/signup` - Handle Google sign-up

## 🔧 How It Works

### Frontend Flow

1. **User clicks "Sign in with Google"** button
2. **Google OAuth popup** opens with Google's authentication
3. **User authenticates** with Google
4. **Google returns JWT token** to frontend
5. **Frontend sends token** to backend API
6. **Backend verifies token** and returns your app's JWT
7. **User is signed in** to your application

### Backend Flow

1. **Receive Google JWT token** from frontend
2. **Verify token** with Google's servers
3. **Extract user information** (email, name, etc.)
4. **Find or create user** in your database
5. **Generate your app's JWT token**
6. **Return user data and token** to frontend

## 🧪 Testing

### 1. Test Frontend Integration

1. **Start your development server**:

   ```bash
   npm run dev
   ```

2. **Navigate to sign-in page** and click "Sign in with Google"

3. **Check browser console** for any errors

4. **Verify Google OAuth popup** appears

### 2. Test Backend Integration

1. **Implement backend endpoints** (see `GOOGLE_OAUTH_BACKEND_REQUIREMENTS.md`)

2. **Test with Postman or curl**:
   ```bash
   curl -X POST http://localhost:8080/auth/google/signin \
     -H "Content-Type: application/json" \
     -d '{"token": "your-google-jwt-token"}'
   ```

## 🐛 Troubleshooting

### Common Issues

1. **"Google Auth not initialized"**

   - Check if `VITE_GOOGLE_CLIENT_ID` is set correctly
   - Verify Google script is loading (check Network tab)

2. **"Invalid token" errors**

   - Ensure backend is properly verifying Google tokens
   - Check if Google Client ID matches between frontend and backend

3. **CORS errors**

   - Configure CORS on backend to allow your frontend domain
   - Add `http://localhost:5173` to allowed origins

4. **"User not found" on sign-in**
   - User must sign up first before signing in
   - Or implement auto-creation on sign-in

### Debug Steps

1. **Check browser console** for JavaScript errors
2. **Check Network tab** for failed API calls
3. **Verify environment variables** are loaded correctly
4. **Test backend endpoints** independently

## 🔒 Security Considerations

1. **Always verify tokens on backend** - never trust frontend tokens
2. **Use HTTPS in production**
3. **Implement rate limiting** on OAuth endpoints
4. **Validate Google Client ID** in token verification
5. **Store sensitive data securely** (never in frontend)

## 📁 File Structure

```
src/
├── components/
│   └── auth/
│       └── GoogleAuthButton.jsx     # Reusable Google auth button
├── services/
│   └── api/
│       └── googleAuth.js            # Google OAuth service functions
├── context/
│   └── AuthContext.jsx              # Updated with Google OAuth
└── pages/
    └── auth/
        ├── SignInForm.jsx           # Updated with Google sign-in
        └── SignUpForm.jsx           # Updated with Google sign-up
```

## 🎯 Next Steps

1. **Set up Google Cloud Console** and get your Client ID
2. **Configure environment variables** in `.env.local`
3. **Implement backend endpoints** (see backend requirements)
4. **Test the complete flow**
5. **Deploy to production** with proper HTTPS and domain configuration

## 📚 Additional Resources

- [Google Identity Services Documentation](https://developers.google.com/identity/gsi/web)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [JWT Token Verification](https://developers.google.com/identity/gsi/web/guides/verify-google-id-token)

## 🆘 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review the backend requirements document
3. Verify all environment variables are set correctly
4. Test each component independently

The implementation is now ready for testing! 🎉
