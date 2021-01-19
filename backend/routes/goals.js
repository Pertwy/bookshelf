const router = require("express").Router();
let Goal = require("../models/goal.model")

router.route("/").get((req, res) => {
    Goal.find()
        .then(goals => res.json(goals))
        .catch(err => res.status(400).json("Error " + err))
})

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const milestones = req.body.milestones;
    //const endDate = Date.parse(req.body.date);

    const newGoal = new Goal({
        title,
        description,
        milestones
        //endDate
    });
  
    newGoal.save()
      .then(() => res.json('Goal added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  

  router.route('/:id').get((req, res) => {
    Goal.findById(req.params.id)
      .then(goal => res.json(goal))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  

  router.route('/:id').delete((req, res) => {
    Goal.findByIdAndDelete(req.params.id)
      .then(() => res.json('Goal deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  

  router.route('/update/:id').post((req, res) => {
    Goal.findById(req.params.id)
      .then(goal => {
        goal.title = req.body.title;
        goal.description = req.body.description;
        goal.milestones = req.body.milestones;
        //goal.endDate = Date.parse(req.body.date);

        Goal.save()
          .then(() => res.json('Goal updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  module.exports = router;