const fs = require('fs');
const { get } = require('http');
const path = require('path');
const cart=require('./cart');
const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
  this.id=id
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
    if(this.id)
    {
      const existingProductIndex= products.findIndex(p=>p.id===this.id);
      const updatedProduct=[...products]
      updatedProduct[existingProductIndex]= this;
      fs.writeFile(p, JSON.stringify(updatedProduct), err => {
      console.log(err);
    });
    }
    else{
    this.id=Math.random().toString();
   
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
  static deletebyid(id,callback)
  {
    getProductsFromFile(products=>
      {
        const product=products.find(p=>p.id===id)
        const updatedProduct=products.filter(p=>p.id!==id)
        fs.writeFile(p,JSON.stringify(updatedProduct),err=>
        {
          if(!err)
          {   
            cart.deleteProduct(id,product.price)
            console.log(err)
            const resume="true"
            return callback(resume)
          }
        })
      })
  };
  static findById(id,cb)
  {
    getProductsFromFile(products=>{
      const product= products.find(p=>p.id===id)
      cb(product)
    })
  }
}; 