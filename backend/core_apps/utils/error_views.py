from django.http import JsonResponse


def handler404(request, exception):
    return JsonResponse({"message": "Route Not Found!"}, status=404)


def handler500(request):
    return JsonResponse({"message": "Internal Server Error!"}, status=500)
