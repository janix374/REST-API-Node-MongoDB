 
 require('dotenv').config();
 
 const http = require('http');
 const app = require('./app');


const port =  process.env.PORT || 3000;

//app argument for creating server
const server = http.createServer(app);

//The server.listen() method creates a listener on the specified port or path.
server.listen(port, function (error) {
    if(error){
        console.log('Something went wrong', error);
    } else {
        console.log(process.env.DATABASE_URL);
        console.log('Server is listening on port ' + port);
    }
});