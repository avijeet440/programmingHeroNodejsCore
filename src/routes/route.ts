
import {IncomingMessage,  ServerResponse} from "http";
import productController from '../controllers/product.controller';
const routeHandler =(req:IncomingMessage,res:ServerResponse,)=>{
    const url=req.url;
    const method=req.method;
    
    if(url==='/' && method==='GET'){
    console.log('this is root route')
    }else{
    console.log('This is not defined ')
    }
    const body="Hello kire bainchod"
    if(url==='/' && method==='GET'){
    res.writeHead(200,{'Contetent-Type':"application/json"}).end(JSON.stringify({message:body}))
        }else if(url?.startsWith('/products')){
           
    productController(req,res);
        }else{
            res.writeHead(404,{'Contetn-Type':"application/json"}).end(JSON.stringify({message:'Nare valo nai bainchod'}))
        }
}

export default routeHandler;