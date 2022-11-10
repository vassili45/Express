const database = require("./database");

const validateMovie = (req, res, next) => {
  const { title, director, year, color, duration} = req.body
  const errors =[];
  if(title == null){errors.push({field: "title", message: "This field is required"});
}else if (title.length >= 255){
  errors.push({field: "title", message: "should contain less than 255 characteres"});
}
  if(director == null){errors.push({field: "director", message: "This field is required"});}
  if(year == null){errors.push({field: "year", message: "This field is required"});}
  if(color == null){errors.push({field: "color", message: "This field is required"});}
  if(duration == null){errors.push({field: "duration", message: "This field is required"});}
  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
}

const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string().email().max(255).required(),
  firstname: Joi.string().max(255).required(),
  lastname: Joi.string().max(255).required(),
});

const validateUser = (req, res, next) => {
  const { firstname, lastname, email } = req.body;

  const { error } = userSchema.validate(
    { firstname, lastname, email },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};


module.exports = {
  validateMovie,
  validateUser,
};