const backendController = require('./src/controller/server');

const port = process.env.PORT || 3000;

// start the server
backendController.listen(port, () => {
  // console.log('server running on port', port);
});
