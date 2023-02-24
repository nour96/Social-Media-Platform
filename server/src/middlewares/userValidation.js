import joi from 'joi'

const registerValidation = joi.object({
    firstName: joi.string().min(3).max(25).trim(true).required(),
    lastName: joi.string().min(3).max(25).trim(true).required(),
    userName: joi.string().min(3).max(25).trim(true).required(),
    email: joi.string().email().trim(true).required(),
    password: joi.string().min(6).trim(true).required(),

})

export const userValidation = async(req, res, next) => {
    const payload = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
		email: req.body.email,
		password: req.body.password,
    }


const { error } = registerValidation.validate(payload);
	if (error) {
		res.status(406).json({message: `Error in User Data : ${error.message}`})
	} else {
		next();
	}

}