const backendController = require('./controller/server');

const port = 8080;

// start the server
backendController.listen(port, () => {
    console.log('server running on port', port);
})