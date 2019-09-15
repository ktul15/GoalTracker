var bodyParser          = require('body-parser'),
    mongoose            = require('mongoose'),
    express             = require('express'),
    app                 = express();
    
mongoose.connect('mongodb://localhost/goaltracker', {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

//Schema Setup
var goalSchema = new mongoose.Schema({
    task: String,
    deadline: Date,
})

var Goal = mongoose.model('Goal', goalSchema);

//Demo Goal
// Goal.create({
//     task: 'Make a goal-tracking app using nodejs',
//     deadline: Date.now()
// }, (err, goal) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log('New Goal: ', goal);
//     }
// })

//INDEX
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

//Server
app.listen(8000, () => {
    console.log('Server Started!');
}) 