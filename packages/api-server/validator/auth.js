const customerValidator = (req,res,next)=>{
    req.check('fullname',"Fullname is required.").notEmpty();
    
    req.check('email',"Email must be between 3 to 32 characters.")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
        min:4,
        max:32
    })
    .normalizeEmail()

    req.check('birthday',"Invalid birthday.").isISO8601().toDate();
    req.check('phone_number','Phone number is required.').notEmpty();


    req.check('password',"Password is required.").notEmpty()
    req.check('password')
    .isLength({
        min:6
    })
    .withMessage("Password must containt at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain number")



    req.check('address',"Address is required.").notEmpty();
    req.check('pid',"PID is required.").notEmpty();
    req.check('create_date',"Invalid create date.").isISO8601().toDate();
    req.check('location', 'Location is required.').notEmpty();


    //check for error
    const errors = req.validationErrors();
    if (errors)
    {
        const firstError = errors.map((err)=> err.msg)[0];
        return res.status(400).json({
            error: firstError
        })
    }
    //process to next middleware
    next();
}
export {customerValidator};