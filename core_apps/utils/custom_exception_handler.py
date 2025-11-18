from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    
    exception_class = exc.__class__.__name__
    response = exception_handler(exc, context)
    
    if exception_class == "AuthenticationFailed":
        response.data = {
            "message": "Invalid Email or Password, Please try again!."
        }    
        
    if exception_class == "NotAuthenticated": 
        response.data = {
            "message": "You will have to login first to access this endpoint."
        }
        
    if exception_class == "InvalidToken": 
        response.data = {
            "message": "Your Authentication Token is expired, Try logging in again."
        }
    
    return response