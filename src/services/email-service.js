const { StatusCodes } = require('http-status-codes');

const { TicketRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { MAILER } = require("../config"); 
const ticketRespository = new TicketRepository();

async function createTicket(data){
    try {
        const ticket = await ticketRespository.create(data);
        return ticket; 
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot create a new City object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function getPendingEmails(){
    try {
        const response = await ticketRespository.getPendingTickets();
        return response;
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot create a new City object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function sendEmail(mailFrom, mailTo, subject, text){
    try {
        const response = await MAILER.sendMail({
            from: mailFrom,
            to: mailTo,
            subject: subject,
            text: text,
        })
        console.log('response :' , response);
        return response;
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot send a new mail ', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createTicket,
    getPendingEmails,
    sendEmail,
}