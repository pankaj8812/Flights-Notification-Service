const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

const { EmailService } = require('../services');

async function create(req, res) {
    try {
        console.log("BODY :",req.body);
        const response = await EmailService.createTicket({
            subject: req.body.subject,
            content: req.body.content,
            recepientEmail: req.body.recepientEmail
        });
        SuccessResponse.data = response;
        return res.status(StatusCodes.CREATED)
                   .json(SuccessResponse);
        // return res.status(201).json(response);
    } catch(error) {
        console.log(error);
        ErrorResponse.error = error;
        return res.status(500).json(ErrorResponse);
    }
}

module.exports = {
    create
}