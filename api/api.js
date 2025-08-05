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

const port = process.env.PORT || 5000;

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

const Item = require('./models/item')


app.post('/api/AddItem', (req, res) => {
    try{
        var {id, item_name, description, status, stock_level, reorderThreshold} = req.body;
        const newItem = new Item({
            id,
            item_name,
            description: description || '',
            status: status || '',
            stock_level: stock_level ?? undefined,
            reorderThreshold: reorderThreshold ?? undefined
        });
        newItem.save();
        res.status(201).json({ message: 'Item created successfully', item: newItem });

    }
    catch (err)
    {
        console.error(err);
        res.status(500).json({ error: 'Error creating item' });
    }
});



app.post('/api/UpdateItem', async (req, res) => {
    try{
        var {id, item_name, description,status, stock_level, reorderThreshold} = req.body;
        if (!id) {
           res.status(500).json({ error: 'Error creating item' });
        }
        console.log(`id: ${id} .`);
        console.log(req.body)


        const UpdateItem = await Item.findOneAndUpdate(
            {id:id},
            {
                ...(item_name !== undefined && {item_name}),
                ...(description !== undefined && {description}),
                ...(status !== undefined && {status}),
                ...(stock_level !== undefined && {stock_level}),
                ...(reorderThreshold !== undefined && {reorderThreshold})

            },
            {new: true}
        );

        if (!UpdateItem) {
            return res.status(404).json({ error: 'Item not found' });
        }


        res.status(200).json({ message: 'Item updated successfully', item: UpdateItem });

    }
    catch (err)
    {
        console.error(err);
        res.status(500).json({ error: 'Error updating item' });
    }
});




app.get('/api/ViewItem/:id', async (req, res) => {
    try{
        var {id} = req.params;
        if (!id) {
           res.status(500).json({ error: 'Error finding item' });
        }

        console.log(req.params);
        const findItem = await Item.findOne({id:id});

        if (!findItem) {
            return res.status(404).json({ error: 'Item not found' });
        }
        console.log(findItem);
        res.status(200).json(findItem);
    }
    catch (err)
    {
        console.error(err);
        res.status(500).json({ error: 'Error finding item' });
    }
});


app.get('/api/ViewAllItems', async (req, res) => {
    try{

        console.log(req.params);
        const findItems = await Item.find();

        if (!findItems) {
            return res.status(404).json({ error: 'Item not found' });
        }
        console.log(findItems);
        res.status(200).json(findItems);
    }
    catch (err)
    {
        console.error(err);
        res.status(500).json({ error: 'Error finding item' });
    }
});