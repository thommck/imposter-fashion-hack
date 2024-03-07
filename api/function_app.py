import azure.functions as func
import logging
import random
import json

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

@app.route(route="fakeapiget")
def fakeapiget(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    urls = [
        'https://storagefashionimposter.blob.core.windows.net/images/fasion-dress.jpg',
        'https://storagefashionimposter.blob.core.windows.net/images/fd2.jpg',
        'https://storagefashionimposter.blob.core.windows.net/images/fd3.jpg'
    ]

    random_url = random.choice(urls)
    
    try:
        return func.HttpResponse(
            json.dumps({"url": random_url}),
            status_code=200
        )
    except Exception as e:
        return func.HttpResponse(
            "Error",
            status_code=500
        )

    