const express = require('express');



const { body, validationResult } = require("express-validator");

const router = express.Router();

const User = require("../models/user.model")



router.post('/',
    body("first_name").isLength({ min: 1 }).withMessage("first name is required"),
    body("last_name").isLength({ min: 1 }).withMessage("last name is required"),
    body("email").isEmail().withMessage("email is required must be a valid email"),
    body("pincode").isLength({ min: 6, max: 6 }).withMessage("pincode is required exactly be 6 Number"),
    body("gender").isLength({ min: 4 }).withMessage("gender is required should be male, female and other"),
    body("age").isLength({ min: 1, max: 100 }).withMessage("age is required exactly 1 to 100"),
    async (req, res) => {
        // res.send("hello")
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ data: error.array() })
        }

        const user = await User.create(req.body);

        return res.status(201).json({ data: user })

    })



module.exports = router;