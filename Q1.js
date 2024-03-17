const http = require('http')
const path = require ('path')
const fs = require('fs')
const {createAuthor} = require ("./reqhandlers");
const {getAllAuthors} = require("./reqhandlers")
const {getAllBooks} = require("./reqhandlers")
const {updateBook} = require("./reqhandlers")
const {deleteOneBook} = require("./reqhandlers")
const {updateAuthor} = require("./reqhandlers")


const port = "4005";
const hostname = "localhost"
 
//const server = http.createServer(reqHandler);
const server = http.createServer(reqHandler);

 function reqHandler(req,res){ 
res.setHeader( 'content-type', "application/json");
   if (req.url === "/books" && req.method === "GET"){ 
    
     getAllBooks(req,res) 
    }

   else if (req.url.startsWith ("/books" ) && req.method === "PUT"){
     updateBook(req,res)
    }
    else if (req.url.startsWith ("/books")&& req.method === "DELETE"){  
    deleteOneBook(req,res)
    }
    else if (req.url.startsWith ("/books/authors")&& req.method === "GET"){
    getAllAuthors(req,res);
  
    }
    else if (req.url.startsWith ("/books/authors") && req.method === "POST"){
    createAuthor(req,res)

    }
    else if (req.url.startsWith ("/books/authors") && req.method === "PUT"){  

    updateAuthor(req,res)
    }           
    else{

    res.end('Route not supported ')
   }
}

//const server = http.createServer(reqHandler);

server.listen(port, hostname, ()=> { console.log (`server is listening at http://${hostname}:${port}`)
})


