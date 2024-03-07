const { app } = require('@azure/functions');
// list of urls to reference in the app
const urls = app.urls(
    'https://storagefashionimposter.blob.core.windows.net/images/fasion-dress.jpg',
    'https://storagefashionimposter.blob.core.windows.net/images/fd2.jpg',
    'https://storagefashionimposter.blob.core.windows.net/images/fd3.jpg'
);


app.http('httpTrigger1', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const randomUrl = urls[Math.floor(Math.random() * urls.length)];
        context.log(`Random URL: ${randomUrl}`);

        return { body: randomUrl};
    }
});
