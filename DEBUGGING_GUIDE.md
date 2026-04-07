# 500 Internal Server Error - Debugging Guide

## Fixed Issues

All API endpoints now have comprehensive error handling with try-catch blocks. The following improvements were made:

### 1. Authentication Routes
- Added input validation for email, password, and name
- Added minimum password length requirement
- Added account status check during login
- Wrapped all auth operations in try-catch blocks

### 2. Course Routes
- Added validation for required fields
- Added type checking for array fields
- Improved error messages for missing data
- All course operations now have error handling

### 3. Enrollment & Progress Routes
- Added validation for courseId and topic parameters
- Added null checks before operations
- Comprehensive error handling for all enrollment operations

### 4. Admin Routes
- Added validation for role and status values
- Improved error messages for invalid inputs
- Protected all admin operations with error handling

### 5. Middleware Improvements
- Enhanced JWT authentication middleware with error handling
- Added user existence check in authorization middleware
- Improved error messages for token-related issues

### 6. Global Error Handler
- Added global error handler middleware for unhandled errors
- Special handling for JWT errors (JsonWebTokenError, TokenExpiredError)
- Special handling for JSON parse errors
- 404 handler for undefined API routes
- Development mode shows stack traces for debugging

## Common Causes of 500 Errors (Now Fixed)

1. **Missing Input Validation** - Fixed with comprehensive validation
2. **Unhandled Exceptions** - Fixed with try-catch blocks
3. **Null/Undefined Access** - Fixed with null checks
4. **Invalid JWT Operations** - Fixed with proper error handling
5. **Missing Error Handlers** - Fixed with global error handler

## Debugging Checklist

### Backend Debugging
1. Check server console logs - all errors now logged with descriptive messages
2. Verify request body structure matches expected format
3. Check authentication token is valid and not expired
4. Verify user has correct permissions for admin routes
5. Check database/data store is accessible (in-memory arrays in this case)

### Frontend Debugging
1. Open Browser DevTools (F12)
2. Go to Network tab
3. Find the failing request
4. Check Request Headers (especially Authorization header)
5. Check Request Payload (Body)
6. Check Response Status and Error Message
7. Look at Console tab for frontend errors

### API Testing with curl
```bash
# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'

# Test authenticated endpoint
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Test course fetch
curl -X GET http://localhost:3000/api/courses
```

## Error Response Format

All errors now follow a consistent format:

```json
{
  "error": "Descriptive error message"
}
```

In development mode, the stack trace is included for debugging.

## Common HTTP Status Codes

- **400 Bad Request** - Missing or invalid input parameters
- **401 Unauthorized** - Missing or invalid authentication token
- **403 Forbidden** - Valid token but insufficient permissions
- **404 Not Found** - Resource (course, user, etc.) not found
- **500 Internal Server Error** - Unexpected server error (now properly handled)

## Best Practices Implemented

1. **Input Validation** - Validate all inputs before processing
2. **Try-Catch Blocks** - Wrap all async operations in try-catch
3. **Descriptive Errors** - Return clear, actionable error messages
4. **Logging** - Log all errors to console for debugging
5. **Status Codes** - Use appropriate HTTP status codes
6. **Global Error Handler** - Catch any unhandled errors
7. **Null Safety** - Check for null/undefined before accessing properties
8. **Type Validation** - Verify data types match expectations

## Testing the Fixes

Test each endpoint with both valid and invalid data:

1. **Test with missing fields** - Should return 400 with clear message
2. **Test with invalid token** - Should return 401/403 with clear message
3. **Test with non-existent resource** - Should return 404
4. **Test with valid data** - Should work correctly
5. **Test edge cases** - Empty strings, null values, etc.

## Monitoring in Production

1. Enable proper logging (consider using Winston or Pino)
2. Set up error tracking (Sentry, Rollbar, etc.)
3. Monitor server health and response times
4. Set up alerts for 500 errors
5. Review logs regularly for patterns

## Environment Variables

Ensure these are set properly:
- `JWT_SECRET` - Secret key for JWT signing
- `NODE_ENV` - Set to "production" in production

## Next Steps for Production

1. Replace in-memory storage with proper database (PostgreSQL/Supabase)
2. Add rate limiting to prevent abuse
3. Add request validation middleware (express-validator)
4. Implement proper logging system
5. Add API documentation (Swagger/OpenAPI)
6. Set up monitoring and alerting
7. Add unit and integration tests
8. Implement HTTPS in production
9. Add CORS configuration for production domains
10. Add request/response compression
