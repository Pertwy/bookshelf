const router = require("express").Router();
let DiaryEntry = require("../models/diaryEntry.model")

router.route("/").get((req, res) => {
    DiaryEntry.find()
        .then(diaryEntrys => res.json(diaryEntrys))
        .catch(err => res.status(400).json("Error " + err))
})

router.route('/add').post((req, res) => {
    const description = req.body.description;
    const newDiaryEntry = new DiaryEntry({description});
  
    newDiaryEntry.save()
      .then(() => res.json('Diary Entry added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/:id').get((req, res) => {
    DiaryEntry.findById(req.params.id)
        .then(DiaryEntrys => res.json(DiaryEntrys))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').delete((req, res) => {
    DiaryEntry.findByIdAndDelete(req.params.id)
        .then(() => res.json('Diary Entry deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/update/:id').post((req, res) => {
    DiaryEntry.findById(req.params.id)
        .then(diaryEntry => {
        diaryEntry.description = req.body.description;

        DiaryEntry.save()
            .then(() => res.json('Diary Entry updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

  module.exports = router;