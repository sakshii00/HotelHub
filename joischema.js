const Joi=require('joi')
module.exports.hschema=Joi.object({
    hotel:Joi.object({
        title: Joi.string().required(),
        price:Joi.number().required().min(0),
        location:Joi.string(),
        description:Joi.string(),
        price:Joi.number(),
        image:Joi.string()
        
        
        
    }).required()
})

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required()
})