const backendController = require('./src/controller/server');

// consider changing this port because REACT is hosted on the same?
const port = process.env.PORT || 5000;

// start the server
backendController.listen(port, () => {
  console.log('server running on port', port);
});
