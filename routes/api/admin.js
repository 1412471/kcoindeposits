var express = require('express');
var mongodb=require('mongodb');
var ObjectId=mongodb.ObjectId;
var router = express.Router();

/* GET students listing. */
router.get('/', function(req, res, next) {
    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://taichau:taichau123@ds249737.mlab.com:49737/kcoindeposits';
    MongoClient.connect(url, function (err, db)
    {
        if(err)
        {
            console.log('Unable to connect to server',err);
        }
        else
        {
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('deposits');
            collection.find({}).toArray(function (err, result) {
                if (err) {
                    res.send(err);
                } else {
                    res.json(result);

                }
                //Close connection
                db.close();
            });
        }
    });
});

router.post('/', function(req, res,next) {
    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://taichau:taichau123@ds249737.mlab.com:49737/kcoindeposits'; 
    MongoClient.connect(url, function (err, db)
    {
        if(err)
        {
            console.log('Unable to connect to server',err);
        }
        else
        {
            console.log('Connection established to', url);
            var myobj = { "idwallet":req.body.idwallet, "deposits":req.body.deposits};
            db.collection("deposits").insertOne(myobj, function(err, result) {
                if (err)
                    res.send(err);
                else
                    res.send("1 documents inserted");
                db.close();
            });

        }
    });
});


module.exports = router;