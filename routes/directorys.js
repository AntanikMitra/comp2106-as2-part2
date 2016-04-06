var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Directory = require('../models/directory');
var passport = require('passport');

// set up the GET handler for the main directorys page
router.get('/', isLoggedIn, function(req, res, next) {
    // use the directory model to retrieve all directorys
    Directory.find(function (err, directorys) {
        // if we have an error
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // we got data back
            // show the view and pass the data to it
            res.render('directorys/index', {

                title: 'directorys',
                directory: directorys
            });
        }
    });
});

// GET handler for add to display a blank form
router.get('/add',isLoggedIn, function(req, res, next) {
    res.render('directorys/add', {
        title: 'Add a New directorys'
    });
});

// POST handler for add to process the form
router.post('/add', function(req, res, next) {

    // save a new directorys using our directorys model and mongoose
    Directory.create( {
            name: req.body.name,
            table: req.body.table,
            floor: req.body.floor
        }
    );

    // redirect to main directorys page
    res.redirect('/directorys');
});

// GET handler for edit to show the populated form
router.get('/:id',isLoggedIn, function(req, res, next) {
   // create an id variable to store the id from the url
    var id = req.params.id;

    // look up the selected directorys
    Directory.findById(id,  function(err, directorys) {
       if (err) {
           console.log(err);
           res.end(err);
       }
        else {
           // show the edit view
           res.render('directorys/edit', {
               title: 'Directory Details',
               directory: directorys
           });
       }
    });
});

// POST handler for edit to update the directorys
router.post('/:id', function(req, res, next) {
    // create an id variable to store the id from the url
    var id = req.params.id;

    // fill the directorys object
    var directory = new Directory( {
        _id: id,
        name: req.body.name,
        table: req.body.table,
        floor: req.body.floor
    });

    // use mongoose and our directorys model to update
    Directory.update( { _id: id }, directory,  function(err) {
        if (err) {
            console.log(err)
            res.end(err);
        }
        else {
            res.redirect('/directorys');
        }
    });
});

// GET handler for delete using the directorys id parameter
router.get('/delete/:id',isLoggedIn, function(req, res, next) {
   // grab the id parameter from the url
    var id = req.params.id;

    console.log('trying to delete');

    Directory.remove({ _id: id }, function(err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // show updated directoryss list
            res.redirect('/directorys');
        }
    });
});

// auth check
function isLoggedIn(req, res, next) {
    // is the user authenticated?
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect('/auth/login');
    }
}


// make public
module.exports = router;
