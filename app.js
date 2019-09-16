var bodyParser          = require('body-parser'),
    methodOverride  = require('method-override'),
    mongoose            = require('mongoose'),
    express             = require('express'),
    app                 = express();
    
mongoose.connect('mongodb://localhost/goaltracker', {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.static('public'));


//Schema Setup
var goalSchema = new mongoose.Schema({
    name: String,
    deadline: Date,
})

var Goal = mongoose.model('Goal', goalSchema);

// Demo Goal
// Goal.create({
//     name: 'Make a goal-tracking app using nodejs',
//     deadline: Date.now()
// }, (err, goal) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log('New Goal: ', goal);
//     }
// })


//RESTful Routes
    //INDEX - show all Goals
    app.get('/goals', (req, res) => {
        //Get all Goals from the database
        Goal.find({}, (err, allGoals) => {
            if(err) {
                console.log(err);
            } else {
                //Display all goals in index page
                res.render('index', {allGoals: allGoals});
            }
        })
    })

    //NEW - show form to create new goals.
    app.get('/goals/new', (req, res) => {
        res.render('new');
    })

    //CREATE - add new goal to DB
    app.post('/goals', (req, res) => {
        var newGoal = req.body.goal;
        Goal.create(newGoal, (err, newlyCreatedGoal) => {
            if(err) {
                console.log(err);
            } else {
                res.redirect('/goals');
            }
        })
    })

    //SHOW - show one goal based on the id in the url
    app.get('/goals/:id', (req, res) => {
        Goal.findById(req.params.id, (err, foundGoal) => {
            if(err) {
                console.log(err);
            } else {
                res.render('show', {foundGoal: foundGoal});
            }
        })
    })

    //EDIT - edit one goal based on the id in the url
    app.get('/goals/:id/edit', (req, res) => {
        Goal.findById(req.params.id, (err, foundGoal) => {
            if(err) {
                console.log(err);
            } else {
                res.render('edit', {goal: foundGoal});
            }
        })
    })

    //UPDATE - update one goal based on the id in the url
    app.post('/goals/:id', (req, res) => {
        Goal.findByIdAndUpdate(req.params.id, req.body.goal, (err, updatedGoal) => {
            if(err) {
                console.log(err);
            } else {
                res.redirect('/goals/');
            }
        })
    })

    //DELETE - delete one goal based on the id in the url
    app.delete('/goals/:id', (req, res) => {
        Goal.findByIdAndRemove(req.params.id, (err, removedGoal) => {
            if(err) {
                console.log(err);
            } else {
                res.redirect('/goals/');
            }
        })
    })


    

//Server
app.listen(8000, () => {
    console.log('Server Started!');
}) 