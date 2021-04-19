const router = require("express").Router();
const User = require("./users-model");
// Require the `restricted` middleware from `auth-middleware.js`. You will need it here!
const { restricted } = require("../auth/auth-middleware");

/**
  [GET] /api/users

  This endpoint is RESTRICTED: only authenticated clients
  should have access.

  response:
  status 200
  [
    {
      "user_id": 1,
      "username": "bob"
    },
    // etc
  ]

  response on non-authenticated:
  status 401
  {
    "message": "You shall not pass!"
  }
 */

router.get("/", restricted, (req, res, next) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
});

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(500).json({
    sageAdvice: "Finding the real error is 90% of the bug fix",
    error: err.message,
    stack: err.stack,
  });
});

// Don't forget to add the router to the `exports` object so it can be required in other modules
module.exports = router;
