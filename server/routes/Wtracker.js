var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
// telling my router that I have this model
let Workout = require('../model/Wtracker.js');
let workoutController = require('../controllers/Wtracker.js');

/* Get route for the workout tracker - Read Operation */
/*
GET,
Post,
Put --> Edit/Update
*/
/* Read Operation --> Get route for displaying the Workouts */
router.get('/', async (req, res, next) => {
    try {
        const WorkoutList = await Workout.find(); 
        res.render('Workout/list', { 
            title: 'Workouts', 
            WorkoutList: WorkoutList 
        });
    } catch (err) {
        console.error(err);
        res.render('Workout/list', { 
            error: 'Error on the server'
        });
    }
});
/* Create Operation --> Get route for displaying the Add Page */
router.get('/add', async (req, res, next) => {
    try {
        res.render('Workout/add', { // Changed 'Book/add' to 'Workout/add'
            title: 'Add Workout' // Changed 'Add Book' to 'Add Workout'
        });
    } catch (err) {
        console.error(err);
        res.render('Workout/list', { // Changed 'Book/list' to 'Workout/list'
            error: 'Error on the server'
        });
    }
});

router.post('/add', async (req, res, next) => {
    try {
        let newWorkout = Workout({
            "date": req.body.date,
            "exercise": req.body.exercise,
            "sets": req.body.sets,
            "reps": req.body.reps,
            "weight": req.body.weight,
            "focus": req.body.focus
        });
        await Workout.create(newWorkout);
        res.redirect('/workouts-list'); // Correct path
    } catch (err) {
        console.error(err);
        res.render('Workout/list', {
            error: 'Error on the server'
        });
    }
});

/* Update Operation --> Get route for displaying the Edit Page */
router.get('/edit/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const workoutToEdit = await Workout.findById(id); // Changed Book to Workout
        res.render('Workout/edit', { // Changed 'Book/edit' to 'Workout/edit'
            title: 'Edit Workout', // Changed 'Edit Book' to 'Edit Workout'
            Workout: workoutToEdit // Changed Book to Workout
        });
    } catch (err) {
        console.error(err);
        next(err); // Passing the error
    }
});

/* Update Operation --> Post route for processing the Edit Page */
router.post('/edit/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let updatedWorkout = Workout({ // Changed Book to Workout and updatedBook to updatedWorkout
            "_id": id,
            "date": req.body.date, // Updated fields to match the Workout schema
            "exercise": req.body.exercise,
            "sets": req.body.sets,
            "reps": req.body.reps,
            "weight": req.body.weight,
            "focus": req.body.focus
        });
        Workout.findByIdAndUpdate(id, updatedWorkout).then(() => { // Changed Book to Workout
            res.redirect('/workoutlist'); // Changed '/bookslist' to '/workoutlist'
        });
    } catch (err) {
        console.error(err);
        res.render('Workout/list', { // Changed 'Book/list' to 'Workout/list'
            error: 'Error on the server'
        });
    }
});

/* Delete Operation --> Get route to perform Delete Operation */
router.get('/delete/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        Workout.deleteOne({ _id: id }).then(() => { // Changed Book to Workout
            res.redirect('/workoutlist'); // Changed '/bookslist' to '/workoutlist'
        });
    } catch (err) {
        console.error(err);
        res.render('Workout/list', { // Changed 'Book/list' to 'Workout/list'
            error: 'Error on the server'
        });
    }
});

module.exports = router;
