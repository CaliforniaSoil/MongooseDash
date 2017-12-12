var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var path = require('path');

app.use(bodyParser.urlencoded({ extended: false}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var connection = mongoose.connect('mongodb://localhost/mongoose_db');

const DogSchema = new mongoose.Schema({
    name: String,
    weight: Number,
    color: String
});

const Dog = mongoose.model('Dog', DogSchema);

app.get('/', function(req, res){
    Dog.find({}, function(err, results){
        if(err){console.log(err); }
        res.render('index', { dogs: results});
    });
});

app.post('/', function(req, res){
    Dog.create(req.body, function(err, result){
        if(err){console.log(err);}
        res.redirect('/')
    }); 
});

app.get('/new', function(req, res){
    res.render('new');
});

app.get('/:id', function(req, res){
    Dog.find({_id: req.params.id}, function(err, response){
        if(err) {console.log(err);}
        res.render('show', { dog: response[0] });
    });
});

app.get('/:id/edit/', function(req, res){
    Dog.find({_id: req.params.id}, function(err, response){
        if(err) {console.log(err);}
        res.render('edit', { dog: response[0] });
    });
});

app.post('/:id', function(req, res){
    Dog.update({ _id: req.params.id }, req.body, function(err, result){
        if(err) {console.log(err);}
        res.redirect('/');
    });
});

app.post('/:id/delete', function(req, res){
    Dog.remove({ _id: req.params.id }, function(err, result){
        if(err){console.log(err);}
    });
});

app.listen(8000, function(){
    console.log('listening on port 8000...');
});