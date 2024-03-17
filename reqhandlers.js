
const fs = require ('fs')
const path = require('path')


const authorsDbPath = path.join(__dirname, "database" , "authors.json")
const booksDbPath = path.join (__dirname, "database", "books.json" )


function getAllBooks(req, res){
  fs.readFile(booksDbPath, "utf8", (err,data) => {
    if (err){
        console.log(err)
        res.writeHead(400)
        res.end("An error occured")
    }
    res.writeHead(200)
    res.end(data)
  
  
  
  
  
    })
  }

function updateBook(req,res) {  const id = req.url.split('/')[2]
 const allItems = JSON.parse(fs.readFileSync(booksDbPath));
  console.log(allItems)
 const itemIndex = allItems.findIndex((item) => { return item.id === parseInt(id)});
 if (itemIndex === -1) { 
  res.writeHead(404); 
 res.end("book does not exist");
}


const item = []
req.on("data", (chunk) => { 
  item.push(chunk)
})
req.on("end", () => { 
  const info = Buffer.concat(item).toString()
  const update = JSON.parse(info)
  console.log (update)

allItems[itemIndex] = {...allItems[itemIndex],...update};
console.log(allItems)

 fs.writeFile(booksDbPath, JSON.stringify(allItems), (err) => { 
   if (err) { 
   res.writeHead(404);
   res.end(JSON.stringify("update was not sucessful"));

   }
   res.end(JSON.stringify(allItems[itemIndex]))
  })



})



}
function deleteOneBook(req, res){  
  
  const id = req.url.split('/')[2];
  console.log(id)
  const allItems = JSON.parse(fs.readFileSync(booksDbPath))
  //console.log(allItems)
   const itemIndex = allItems.findIndex((item) =>  {return item.id === parseInt(id)});
  

  if (itemIndex === -1){
    res.writeHead(404);
    res.end(JSON.stringify("message: item does not exist"))
  }
   
   allItems.splice(itemIndex, 1)
   fs.writeFile(booksDbPath, JSON.stringify(allItems), (err) => {

    if (err) { 
      res.writeHead(404);
      res.end(JSON.stringify("item was not deleted"));
  
  
     }
     res.end("item sucessfully deleted")



    
   
   })
   
//res.end("am here")

}

function getAllAuthors(req, res){
  fs.readFile(authorsDbPath, "utf8", (err,data) => {
    if (err){
        console.log(err)
        res.writeHead(400)
        res.end("An error occured")
    }
    res.writeHead(200)
    res.end(data)
  
  
  
  
  
    })
  }

 
function createAuthor(req,res){

  const item = [];

req.on('data', (chunk)=> { 
  
   item.push(chunk)
  
})
req.on("end", () => {
  const newItem =  JSON.parse(Buffer.concat(item).toString())
  console.log(newItem);
  const allItems = JSON.parse(fs.readFileSync(authorsDbPath))
  //console.log(allItems);
  const lastItemId = allItems[allItems.length -1].Id;
  //console.log(lastItemId)
  const newItemId = lastItemId +1
 //const newItemid= math.floor(lastwItemid*1000)

  const newAuthor = {...newItem, Id: newItemId}
 //console.log(newAuthor)

 //const updatedItems =  [...allItems, {...newItem, id: newItemid}]

  const updatedItems =  [...allItems, newAuthor];
  console.log (updatedItems)

  fs.writeFile(authorsDbPath, JSON.stringify(updatedItems), (err) => {
if (err) { console.log ("author could not be added ")

         }


  res.end("author created sucessfully")

  })

  
})

}


function updateAuthor(req,res) {  const id = req.url.split('/')[2]
 const allItems = JSON.parse(fs.readFileSync(authorsDbPath));
  console.log(allItems)
 const itemIndex = allItems.findIndex((item) => { return item.id === parseInt(id)});
 if (itemIndex === -1) { 
  res.writeHead(404); 
 res.end("Author does not exist");
}


const item = []
req.on("data", (chunk) => { 
  item.push(chunk)
})
req.on("end", () => { 
  const info = Buffer.concat(item).toString()
  const update = JSON.parse(info)
  console.log (update)

allItems[itemIndex] = {...allItems[itemIndex],...update};
console.log(allItems)

 fs.writeFile(authorsDbPath, JSON.stringify(allItems), (err) => { 
   if (err) { 
   res.writeHead(404);
   res.end(JSON.stringify("update was not sucessful"));

   }
   res.end(JSON.stringify(allItems[itemIndex]))
  })



})



}


    module.exports = {getAllBooks,updateBook,deleteOneBook,getAllAuthors,createAuthor,updateAuthor}

//module.exports * = reqhandlers.js





  