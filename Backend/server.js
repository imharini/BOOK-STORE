const express = require('express')
const cors = require('cors')
const connectDB = require('./db/config');
const multer = require('multer');
const Admin = require('./db/Admin/Admin')
const users = require('./db/Users/userschema')
const seller = require('./db/Seller/Seller')
const items = require('./db/Seller/Seller')
const myorders = require('./db/Users/myorders')
const WishlistItem = require('./db/Users/Wishlist')

const app = express()

app.use(express.json())

app.use(cors({
    origin: ["http://localhost:5174"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true
}));

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: function (req, file, callback){
        callback(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage});
app.use('/uploads', express.static('uploads'));

//Admin
//login

app.post('/alogin', (req, resp) =>{
    const {email, password} = req.body;
    Admin.findOne({email: email})
        .then(user =>{
            if(user){
                if(user.password === password){
                    return resp.json({Status: "success", user: {id:user.id,name:user.name,email:user,email} })
                } else{
                    resp.json("login fail")
                }
            } else{
                resp.json("no user")
            }
        })
})

//registe api

app.post('/asignup', (req, resp)=>{
    const {name, email, password} = req.body;
    Admin.findOne({email: email})
        .then(use =>{
            if(use){
                resp.json("Alreasy have an account")
            } else {
                Admin.create({ email: email, name: name, password: password})
                    .then(result => resp.json("Account created"))
                    .catch(err => resp.json(err))
            }
        }).catch(err => resp.json("failed"))
})

app.get('/users', (req,res)=>{
    users.find()
    .then((user)=>{
        res.status(200).json(user)
    })
    .catch(()=>{
        res.sendStatus(500)
    })
})
app.delete('/userdelete/:id',(req,res)=>{
    const{id} = req.params
    users.findByIdAndDelete(id)
    .then(()=>{
        res.sendStatus(200);
    })
    .catch((error)=>{
        res.status(500).json({error: 'Internal server error'});
    });
})
app.delete('/userorderdelete/:id', async (req, res)=>{
    const {id} = req.params;
    try {
        await myorders.findByIdAndDelete(id);
        res.sendStatus(200);
    } catch (error){
        res.status(500).json({error: 'Internal server error'});
    }
});
app.delete('/useritemdelete/:id', async (req,res) => {
    try{
        await items.findByIdAndDelete(id);
        res.sendStatus(200)
    } catch (error){
        res.status(500).json({error: 'internal server error'});
    }
});

app.get('/sellers',(req,res)=>{
    seller.find()
    .then((seller)=>{
        res.status(200).json(seller)
    })
    .catch(()=>{
        res.sendStatus(500)
    })
})

app.delete('/sellerdelete/:id', (req,res)=>{
    const {id} = req.params
    seller.findByIdAndDelete(id)
    .then(()=>{
        res.sendStatus(200);
    })
    .catch((error)=>{
        res.status(500).json({error: 'Internal server error'});
    });
})
app.get('/orders', (req,res)=>{
    myorders.find()
        .then((orders) =>{
            res.status(200).json(orders)
        })
        .catch(()=>{
            res.sendStatus(500)
        })
});

//seller
//login api

app.post('/slogin', (req, resp) =>{
    const  {email, password} = req.body;
    seller.findOne({email: email})
        .then(user => {
            if(user){
                if(user.password === password){
                    return resp.json({Status: "success", user: {id: user.id, name: user.name, email: user.email}})
                } else {
                    resp.json("login fail")
                }
            } else {
                resp.json("no user")
            }
        })
})
 //register api

app.post('/ssignup', (req, resp) =>{
    const {name, email, password} = req.body;
    seller.findOne({email: email})
        .then(use =>{
            if(use){
                resp.json("Already have an account")
            } else {
                seller.create({email: email, name: name, password: password})
                .then(result => resp.json("Already created"))
                .catch(err => resp.json(err))
            }
        }).catch(err => resp.json("failed"))
}) 

//add book
app.post('/items', upload.single('itemImage'), async (req,res)=>{
    const {title, author, genre, description, price, userId, userName} = req.body;
    const itemImage = req.file.path;

    try {
        const item = new items({itemImage, title, author, genre, description, price, userId, userName});
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(400).json({error: 'Failed to create item'})
    }
});

//get books
app.get('/getitem/:userId', async (req, res) =>{
    const userId = req.params.userId;
    try {
        const tasks =await items.find({userId}).sort('position');
        res.json(tasks);
    } catch (err){
        res.status(500).json({error: 'Failed to fetch tasks'});
    }
});
//delete book
app.delete('/itemdelete/:id', (req,res)=>{
    const {id} = req.params;
    items.findByIdAndDelete(id)
        .then(()=>{
            res.sendStatus(200);
        })
        .catch((error)=>{
            res.status(500).json({error: 'Internal server error'});
        });
})

//get orders
app.get('/getsellerorders/:userId', async (req,res)=>{
    const sellerId = req.params.userId;
    try{
        const tasks = await myorders.find({sellerId}).sort('position');
    } catch (err) {
        res.status(500).json({error: 'Failed to fetch tasks'});
    }
});

//userd
//login
app.post('/login',(req,res)=>{
    const {email, password} = req.body;
    users.findOne({email: email})
        .then(user =>{
            if(user){
                if(user.password === password){
                    return res.json({Status: "success", user: {id: user.id, name: user.name, email: user.email}})
                }
                else{
                    res.json("Invalid password")
                }
            }
            else{
                res.json("user not found")
            }
        })    
})

app.post('/signup', (req,resp)=>{
    const {name,email,password} = req.body;
    users.findOne({email: email})
        .then(use =>{
            if(use){
                resp.json("Already have an account")
            } else {
                users.create({email: email, name:name, password:password})
                .then(result => resp.json("Already created"))
                .catch(err => resp.json("failed"))
            }
        }).catch(err => resp.json("failed"))
})

app.get('/item', async (req, res)=>{
    try{
        const images = await items.find();
        res.json(images);
    } catch (error){
        console.error(error);
        res.status(500).send('Server Error');
    }
});
//single item
app.get('/item/:id', async (req,res) =>{
    const id = req.params.id;
    try{
        const item = await items.findById({_id: id});
        res.json(item);
    } catch(err){
        res.status(500).json({error: err.message});
    }
});

app.post('/userorder', async (req, res)=>{
    const {flatno, city, state, pincode, totalamount, seller, sellerId, BookingDate, description, Delivery, userId,userName} = req.body;

    try{
        const order = new myorders({flatno, city, state, pincode, totalamount, seller, sellerId, BookingDate, description, Delivery, userId, userName});
        await order.save();
        res.status(201).json(order);
    } catch (err){
        res.status(400).json({error: 'Failed to create policy'});
    }
});

app.get('/getorders/:userId', async (req,res)=>{
    const userId = req.params.userId;
    try{
        const tasks = await myorders.find({userId}).sort('positions');
        res.json(tasks);
    } catch (err){
        res.status(500).json({error: 'failed to fetch tasks'});
    }
});

app.get('/wishlist', async (req, res)=>{
    try{
        const WishlistItem = await WishlistItem.find();
        res.json(WishlistItem);
    } catch (error){
        console.error(error);
        res.status(500).send('server error');
    }
});
app.get('/wishlist/:userId', async (req,res)=>{
    const userId = req.params.userId;
    try{
        const tasks = await WishlistItem.find({userId}).sort('positions');
        res.json(tasks);
    } catch (err){
        res.status(500).json({error: 'failed to fetch tasks'});
    }
});

app.post('/wishlist/add', async (req,res)=>{
    const{itemId, title, itemImage, userId,userName} = req.body;
    try{
        const existingItem = await WishlistItem.findOne({itemId});
        if(existingItem){
            return res.status(400).json({msg: 'item already in wishlist'});
        }

        const newItem = new WishlistItem({itemId, title, itemImage, userId, userName});
        await newItem.save();

        res.json(newItem);
    }catch (error){
        console.error(error);
        res.status(500).send('server error');
    }
});

app.post('/wishlist/remove', async (req,res)=>{
    const {itemId} = req.body;

    try{
        await WishlistItem.findOneAndDelete({itemId});
        res.json({msg: 'item removed from wishlist'});
    } catch (error){
        console.error(error);
        res.status(500).send('server error');
    }

});


// server.js

 // Import connectDB function from db.js


// Call connectDB to connect to MongoDB
connectDB();

app.use(express.json()); // Middleware to parse JSON requests

// Example route to test the server
app.get('/', (req, res) => res.send('API is running...'));

// Start the server
const PORT = process.env.PORT || 9000; // This is already fine
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



