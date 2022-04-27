const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const { cwd } = require('process');

const mongoose = require('mongoose');

const userModel = mongoose.model('user');
const itemModel = mongoose.model('item');
const orderModel = mongoose.model('order');

const passport = require('passport');
const fs = require('fs');

router.route('/order').post((req, res, next) =>{
    if(!req.session.userId) return res.status(401).send('You don\'t have access to this endpoint.');
    console.log(req.body.uid);
    if(req.body.uid, req.body.items, req.body.totalPrice){
        console.log(req.body.uid);
        var returnDate = "";
        //get datetime now
        var today = new Date();
        //split
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //because January is 0! 
        var yyyy = today.getFullYear();
        //Interpolation date
        if (dd < 10) {
            returnDate += `0${dd}.`;
        } else {
            returnDate += `${dd}.`;
        }
    
        if (mm < 10) {
            returnDate += `0${mm}.`;
        } else {
            returnDate += `${mm}.`;
        }
        returnDate += yyyy;



        const order = new orderModel({
            uid: req.body.uid,
            items: req.body.items,
            date: returnDate,
            totalPrice: req.body.totalPrice
        })
        order.save((error) => {
            if (error) return res.status(500).send('Error occured on saving data' + error);
            const itemsJson = JSON.parse(req.body.items);
            itemsJson.forEach(it =>{

                const doc = itemModel.updateOne({
                    Id: it.id
                }, { inStock: Number(it.count) }, { upsert: true });
                console.log(doc);
            })
            return res.status(200).send('Order saved');
        })
    }else{
        return res.status(400).send('Missing data on sending order.');
    }
}).get((req, res, next) =>{
    if(!req.session.userId) return res.status(401).send('You don\'t have access to this endpoint.');
    orderModel.find({}, (err, orders) =>{
        if (err) return res.status(500).send('Database issue.');
        return res.status(200).send(orders);
    })
}).delete((req, res, next) =>{
    if(!req.session.userId || req.session.user['accessLevel'] != 'admin') return res.status(401).send('You don\'t have access to this endpoint.');
    if(req.body.oid){
        orderModel.findOne({ _id: req.body.oid }, (err, order) => {
            if (err) return res.status(500).send('Database issue');
            if (order) {
                order.delete((error) => {
                    if (error) return res.status(500).send('Error during deletion' + error);
                    return res.status(200).send('Succesfully deleted');
                })
            } else {
                return res.status(400).send('Error, can\'t find order with this ID');
            }
        })
    }
})


router.route('/item').post((req, res, next) => {
    if(!req.session.userId) return res.status(401).send('You don\'t have access to this endpoint.');
    itemModel.findOne({ Id: req.body.Id }, (err, item) => {
        if (err) return res.status(400).send('Cannot find this ID in the database.');
        return res.status(200).send(item);
    })
})

router.route('/admin/restartDB').patch((req, res, next) => {
    if(!req.session.userId || req.session.user['accessLevel'] != 'admin') return res.status(401).send('You don\'t have access to this endpoint.');
    let jsonData = require('./defaultData.json');

    //Clearing items collection
    itemModel.collection.drop();

    var items = [];
    jsonData.forEach(element => {
        const item = new itemModel({
            Id: element['_id'],
            Name: element['_props']['Name'],
            Description: element['_props']['Description'],
            Durability: element['_props']['Durability'],
            Ergonomics: element['_props']['Ergonomics'],
            QuestItem: element['_props']['QuestItem'],
            Rarity: element['_props']['Rarity'],
            ShortName: element['_props']['ShortName'],
            ammoCaliber: element['_props']['ammoCaliber'],
            weapUseType: element['_props']['weapUseType'],
            CreditsPrice: element['_props']['CreditsPrice'],
            weapClass: element['_props']['weapClass'],
            inStock: Math.floor(Math.random() * 1000),
            ImagePath: element['img'] ?? "resource/empty.png"
        });
        items.push(item);

    })
    console.log(items);
    itemModel.collection.insertMany(items, onInsert);

    function onInsert(err, docs) {
        if (err) {
            console.log(err);
        } else {
            console.info('%d items were successfully stored.', docs.length);
        }
    }

    res.status(200).send(jsonData[1]);
})

router.route('/login').post((req, res, next) => {
    if (req.body.username, req.body.password) {
        passport.authenticate('local', function (error, user) {
            if (error) return res.status(500).send(error);
            req.login(user, function (error) {
                if (error) return res.status(500).send(error);
                req.session.save((err) => {
                    if (err) return res.status(400).send('Error during session save' + err);
                    req.session.user = user;
                    req.session.userId = user._id;
                    //console.log(req.session);
                    return res.status(200).send(user);
                });

            })
        })(req, res);
    } else {
        return res.status(400).send('Wrong call, we need username and password.');
    }
});

router.route('/logout').post((req, res, next) => {
    if(!req.session.userId) return res.status(401).send('You don\'t have access to this endpoint.');
    console.log("logout isAuth: " + req.session.userId);
    if (req.session.userId) {
        req.session.destroy(function (err) {
            if (err) {
                return res.status(403).send('Hiba a kijelentkezés során');
            }
            return res.status(200).send('Kijelentkezes sikeres');
        })
    } else {
        return res.status(403).send('Nem is volt bejelentkezve');
    }
})

router.route('/status').get((req, res, next) => {
    if (req.session.userId) {
        return res.status(200).send(req.session.passport);
    } else {
        return res.status(403).send('Nem is volt bejelentkezve STATUS');
    }
})

router.route('/user').get((req, res, next) => {
    if(!req.session.userId) return res.status(401).send('You don\'t have access to this endpoint.');
        userModel.find({}, (err, users) => {
            if (err) return res.status(500).send('DB hiba');
            return res.status(200).send(users);
        })
    
}).post((req, res, next) => {
    if (!req.body.uid) {
        if (req.body.username && req.body.email && req.body.password) {
            userModel.findOne({ username: req.body.username }, (err, user) => {
                if (err) return res.status(500).send('db hiba');
                if (user) {
                    return res.status(400).send('User with this name already exists.');
                }
                const usr = new userModel({ username: req.body.username, password: req.body.password, email: req.body.email });
                usr.save((error) => {
                    if (error) return res.status(500).send('Error during saving.' + error);
                    return res.status(200).send(usr);
                })
            })
        } else {
            return res.status(400).send('Incomplete data');
        }
    } else {
        userModel.findOne({ _id: req.body.uid }, (err, user) => {
            if (err) return res.status(500).send('Database error');
            return res.status(200).send(user);
        })
    }
}).put((req, res, next) => {
    if(!req.session.userId) return res.status(401).send('You don\'t have access to this endpoint.');
    if (req.body.uid) {
        userModel.findOne({ _id: req.body.uid }, (err, user) => {
            if (err) return res.status(500).send('Database error');
            if (user) {
                user.username = req.body.username ?? user.username;
                user.password = req.body.password ?? user.password;
                user.email = req.body.email ?? user.email;
                user.save((error) => {
                    if (error) return res.status(500).send('Error during saving.' + error);
                    return res.status(200).send(user);
                })
            } else {
                return res.status(400).send('User with this name already exists.');
            }
        })
    } else {
        return res.status(400).send('Incomplete data');
    }
}).delete((req, res, next) => {
    console.log(req.session.user['accessLevel']);
    if(!req.session.userId || req.session.user['accessLevel'] !== 'admin') return res.status(401).send('You don\'t have access to this endpoint.');
    if (req.body.username && req.body.username != 'admin') {
        userModel.findOne({ username: req.body.username }, (err, user) => {
            if (err) return res.status(500).send('Database error');
            if (user) {
                user.delete((error) => {
                    if (error) return res.status(500).send('Error during saving.' + error);
                    return res.status(200).send('Sikeres törlés');
                })
            } else {
                return res.status(400).send('Cannot find user with this name');
            }
        })
    } else {
        return res.status(400).send('Incomplete data');
    }
})



router.route('/items').get((req, res, next) => {
    console.log(req.session);
    const userId = req.session.userId;
    console.log(userId);
    console.log(req.session.user['accessLevel']);
    if(!req.session.userId) return res.status(401).send('You don\'t have access to this endpoint.');
    itemModel.find({}, (err, items) => {
        if (err) return res.status(500).send('Database error');
        res.status(200).send(items);
    })
}).post((req, res, next) => {
    if(!req.session.userId || req.session.user['accessLevel'] != 'admin') return res.status(401).send('You don\'t have access to this endpoint.');
    if (req.body.Id
        && req.body.Name
        && req.body.Description
        && req.body.Durability
        && req.body.Ergonomics
        && req.body.QuestItem
        && req.body.Rarity
        && req.body.ShortName
        && req.body.ammoCaliber
        && req.body.weapUseType
        && req.body.CreditsPrice
        && req.body.inStock
        && req.body.weapClass
    ) {
        itemModel.findOne({ Name: req.body.Name }, (err, item) => {
            if (err) return res.status(500).send('db hiba');
            if (item) {
                if (err) return res.status(400).send('Van ilyen nevű termék');
            } else {
                const item = new itemModel({
                    Id: req.body.Id,
                    Name: req.body.Name,
                    Description: req.body.Description,
                    Durability: req.body.Durability,
                    Ergonomics: req.body.Ergonomics,
                    QuestItem: req.body.QuestItem,
                    Rarity: req.body.Rarity,
                    ShortName: req.body.ShortName,
                    ammoCaliber: req.body.ammoCaliber,
                    weapUseType: req.body.weapUseType,
                    CreditsPrice: req.body.CreditsPrice,
                    weapClass: req.body.weapClass,
                    inStock: req.body.inStock,
                    ImagePath: req.body.ImagePath ?? "resource/empty.png"
                });
                item.save((error) => {
                    if (error) return res.status(500).send('Error during save');
                    return res.status(200).send('Saved');
                })
            }
        })
    } else {
        return res.status(400).send('Incomplete data');
    }

}).put((req, res, next) => {
    console.log(req.body.item.Id);
    if(!req.session.userId || req.session.user['accessLevel'] != 'admin') return res.status(401).send('You don\'t have access to this endpoint.');
    if (req.body.item.Id) {
        itemModel.findOne({ Id: req.body.item.Id }, (err, item) => {
            if (err) return res.status(500).send('db hiba');
            if (item) {
                item.Name = req.body.item.Name ?? item.Name;
                item.Description = req.body.item.Description ?? item.Description;
                item.Durability = req.body.item.Durability ?? item.Durability;
                item.Ergonomics = req.body.item.Ergonomics ?? item.Ergonomics;
                item.QuestItem = req.body.item.QuestItem ?? item.QuestItem;
                item.Rarity = req.body.item.Rarity ?? item.Rarity;
                item.ShortName = req.body.item.ShortName ?? item.ShortName;
                item.ammoCaliber = req.body.item.ammoCaliber ?? item.ammoCaliber;
                item.weapUseType = req.body.item.weapUseType ?? item.weapUseType;
                item.CreditsPrice = req.body.item.CreditsPrice ?? item.CreditsPrice;
                item.weapClass = req.body.item.weapClass ?? item.weapClass;
                item.inStock = req.body.item.inStock ?? item.inStock;
                item.ImagePath = req.body.item.ImagePath ?? item.ImagePath;
                item.save((error) => {
                    if (error) return res.status(500).send('Error during save');
                    return res.status(200).send('Saved');
                })
            } else {
                return res.status(400).send('There is no item with this ID in the database');
            }
        })
    } else {
        return res.status(400).send('Incomplete data');
    }
}).delete((req, res, next) => {
    if(!req.session.userId || req.session.user['accessLevel'] != 'admin') return res.status(401).send('You don\'t have access to this endpoint.');
    if (req.body.Id) {
        itemModel.findOne({ Id: req.body.Id }, (err, item) => {
            if (err) return res.status(500).send('Database error');
            if (item) {
                item.delete((error) => {
                    if (error) return res.status(500).send('Error during deletion');
                    return res.status(200).send('Deleted');
                })
            } else {
                return res.status(400).send('ID cannot find in the database');
            }
        })
    } else {
        return res.status(400).send('Incomplete ID or Value');
    }
})

module.exports = router;