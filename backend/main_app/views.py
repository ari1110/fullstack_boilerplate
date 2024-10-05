from django.shortcuts import render
from django.http import JsonResponse

def home(request):
    return JsonResponse({"message": "Welcome to the Fullstack App API"})

# Add more views as needed