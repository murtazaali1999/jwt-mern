const { registerUser, loginUser, getUserData } = require("../controllers/user");
const { protect } = require("../middleware/authMiddleware");

const router = require("express").Router();


router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/get-user", protect, getUserData);





module.exports = router;