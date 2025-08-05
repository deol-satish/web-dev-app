const mongoose = require('mongoose');
//mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
mongoose.connect('mongodb+srv://cyberdeolsatish:X7vxT9677uNtVxk2@cluster0.mxvnryk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });
//mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

//mongoose.connect('mongodb+srv://deolsatish:debarati@sit209.udjho.mongodb.net/test1');
// To connect to mongo db dtabase using mongodb shell mongo "mongodb+srv://cluster0.lpmrh.mongodb.net/BabyMonitor>" --username adv

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = process.env.PORT || 5050;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/test', (req, res) => {
    res.send('The API is working!');
    });
app.listen(port, () => {
    console.log(`listening on port ${port}`);
    });

const Item = require('./models/item');
const SupplierOrder = require('./models/supplierorder');


app.post('/supplier-api/place-order', async (req, res) => {
    try{
        console.log("888888888888888888888888888888888888888888888888888888")
        var {order_id, item_id, quantity, delivery_date} = req.body;
        console.log(quantity);
        if (!item_id) {
           res.status(500).json({ error: 'Error creating item' });
        }
        console.log(`id: ${item_id} .`);
        console.log(req.body);
        const fItem = await Item.findOne({id:item_id});
        if (!fItem) {
            return res.status(404).json({ error: 'Item not found' });
        }
        if (quantity !== undefined) fItem.stock_level+= quantity;
        console.log(quantity);
        console.log(fItem.stock_level);
        await fItem.save();
        console.log('Item updated',fItem);
        res.status(200).json({ message: 'Item updated successfully', item: fItem });

        newstatus = "" ;

        const SupplierOrder = new Item({
            order_id,
            item_id,
            quantity: quantity ?? undefined,
            status: newstatus || '',
            deliveryDate: delivery_date || '',
        });
        SupplierOrder.save();
    }


    catch (err)
    {
        console.error(err);
        res.status(500).json({ error: 'Error updating item' });
    }
});

