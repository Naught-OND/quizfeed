const router         = require("express").Router();
const quizController = require("../../controllers/quizController");

router.route("/")
      .get(quizController.findAll)       // Finds all quizes
      .post(quizController.createOne);   // Posts a new quiz

router.route("/:id")
      .get(quizController.findOne)       // Finds a quiz by id
      .put(quizController.updateData)    // Updates user data for quiz
      .post(quizController.editQuiz)     // Updates fields of a quiz
      .delete(quizController.deleteOne); // Deletes a quiz

router.route("/user/:id")
      .get(quizController.findAllByUser); // Finds all quizes by a single user

module.exports = router;
