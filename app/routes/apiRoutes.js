const db = require("../models");

module.exports = function(app) {

    // Retrieve all workouts
    app.get('/api/workouts', (req, res) => {
        db.Workout.find({}, (err, data) => {
            if (err) throw err;
            res.json(data);
        });
    });

    // Add new exercise to workout
    app.put('/api/workouts/:id', ({params, body},res) => {
        db.Workout.findOneAndUpdate({ _id: params.id}, 
            {$push: 
                { exercises: body } 
            }, 
            { 
                upsert: true,
                useFindAndModify: false 
            }, 
            updatedWorkout => {
                res.json(updatedWorkout);
            }
        );
    });

    // Create workout
    app.post('/api/workouts', (req,res) => {
        db.Workout.create({}).then(newWorkout => { 
            res.json(newWorkout);
        });
    });
}