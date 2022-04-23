const asyncHandler = require("express-async-handler");

const Goal = require('../models/goalModel') 

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find();   
    res.status(200).json(goals);
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400);
        throw new Error('Please add a text field');
    }
    const goal = Goal.create({
        text: req.body.text
    })
    res.status(200).json(goal);
})

// @desc    Update goal
// @route   PUT /api/goals/:goalId
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.goalId)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const updatedGoal = await Goal.updateOne({ _id: req.params.goalId }, {$set: { text: req.body.text }})


    res.status(200).json(updatedGoal);
})


// @desc    Delete goal
// @route   DELETE /api/goals/:goalId
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.goalId)

    if(!goal){
        res.status(400)
        throw new Error('Please provide an existing goal')
    }

    const deletedGoal = await Goal.remove({ _id: req.params.goalId })

    res.status(200).json(deletedGoal);
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}