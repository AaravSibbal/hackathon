const express = require('express')
const app = express();

const PORT = process.env.PORT || 3000
const ROOT_DIR = "/web"


app.use(express.static(__dirname + ROOT_DIR))

app.listen(PORT, err =>{
    if(err){
        console.log(err);
    }
    else{
        console.log(`Server listening on port : ${PORT} CNTL-C to quit`)
        console.log("To Test:");
        console.log("http://localhost:3000/chatClient.html")
    }
})