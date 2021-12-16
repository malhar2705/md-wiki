const Joi = require('joi');

const validateArticle = function(article){
    const articleSchema = Joi.object({
        "id":Joi.number(),
        "name": Joi.string().min(3).required(),
        "desc": Joi.string().min(10).required()
    });

    return articleSchema.validate(article);

};


exports.validateArticles = validateArticle;