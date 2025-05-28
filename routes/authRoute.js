const router = require("express").Router();
const {createNewUser} = require('../controllers/registerController')
const {login} = require('../controllers/loginController')

router.post("/register",createNewUser);
router.post("/login",login);




router.get("/",(req,res)=>{
    console.log('hellp');
    res.send({name:'hellp'})
});

module.exports = router;
