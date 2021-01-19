const router = require("express").Router();
let Test = require("../models/test.model")

router.route("/").get((req, res) => {
    Test.find()
        .then(diaryEntrys => res.json(diaryEntrys))
        .catch(err => res.status(400).json("Error " + err))
})

router.route('/add').post((req, res) => {
 
    const title = req.body.title;
    const testArray = req.body.testArray;
    const details = req.body.details;
    //const endDate = Date.parse(req.body.date);

    const newTest = new Test({
        title,
        testArray,
        details
        //endDate
    });


    newTest.save()
      .then(() => res.json('Test complete!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/:id').get((req, res) => {
    Test.findById(req.params.id)
        .then(DiaryEntrys => res.json(DiaryEntrys))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').delete((req, res) => {
    Test.findByIdAndDelete(req.params.id)
        .then(() => res.json('Diary Entry deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/update/:id').post((req, res) => {
    Test.findById(req.params.id)
        .then(diaryEntry => {
        diaryEntry.description = req.body.description;

        Test.save()
            .then(() => res.json('Diary Entry updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

  module.exports = router;