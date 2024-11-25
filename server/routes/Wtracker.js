var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
// telling my router that I have this model
let Workout = require('../model/Wtracker.js');
let workoutController = require('../controllers/Wtracker.js');

/* Get route for the workout tracker - Read Operation */
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
        res.render('Workout/add', {
            title: 'Add Workout'
        });
    } catch (err) {
        console.error(err);
        res.render('Workout/list', {
            error: 'Error on the server'
        });
    }
});

/* Create Operation --> Post route for processing the Add Page */
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
        res.redirect('/workouts-list'); // Corrected path
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
        const workoutToEdit = await Workout.findById(id);
        res.render('Workout/edit', {
            title: 'Edit Workout',
            Workout: workoutToEdit
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
        let updatedWorkout = Workout({
            "_id": id,
            "date": req.body.date,
            "exercise": req.body.exercise,
            "sets": req.body.sets,
            "reps": req.body.reps,
            "weight": req.body.weight,
            "focus": req.body.focus
        });
        Workout.findByIdAndUpdate(id, updatedWorkout).then(() => {
            res.redirect('/workouts-list'); // Corrected path
        });
    } catch (err) {
        console.error(err);
        res.render('Workout/list', {
            error: 'Error on the server'
        });
    }
});

/* Delete Operation --> Get route to perform Delete Operation */
router.get('/delete/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        await Workout.deleteOne({ _id: id });
        res.redirect('/workouts-list'); // Corrected path
    } catch (err) {
        console.error(err);
        res.render('Workout/list', {
            error: 'Error on the server'
        });
    }
});

module.exports = router;
