const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middlewire 
app.use(cors())
app.use(express.json())

// user : emajon 
// pass : iE42JTDtoWt0GskB



const uri = "mongodb+srv://emajon:iE42JTDtoWt0GskB@cluster1.bs90o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
      try{
            await client.connect();
            const productCal = client.db("emajon").collection("product");

            // read 
            app.get('/product' , async (req , res) =>{
                  // stap - 6 
                  // seach query golo nebo 
                  const page = parseInt(req.query.page)
                  const size = parseInt(req.query.size)
                  console.log(req.query);
                  const query = {}
                  const cursor = productCal.find(query)
                  

                  let prodect ;
                  if(page || size){
                        prodect  =  await cursor.skip(page*size).limit(size).toArray()

                  }
                  else{
                        prodect =  await cursor.toArray()

                  }
                
                  
                  res.send(prodect)
            })

            // database e koyti product ace ta janar jonno 
            app.get('/productCount' , async (req , res) =>{
                  // const query = {}
                  // const cursor = productCal.find(query)
                  const count = await productCal.estimatedDocumentCount()
                  res.send({count}) 
            })


            // id diye database theke kujbo 

            app.post('productByKeys', async( req , res) =>{
                  const keys = req.body
                  console.log(keys);
                  const ids = keys.map(id => ObjectId(id))

                  // database theke kisu kujte hole dolar in diye kujte hobe 
                  const qeury = {_id: {$in: ids}}
                  const cursor = productCal.find(qeury)
                  const product = await cursor.toArray()
                  res.send(product)
            })
      }
        
            finally{

            }  
               
               
}


run().catch(console.dir)



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`listening on port `, port)
})