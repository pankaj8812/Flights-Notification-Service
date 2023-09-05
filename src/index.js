const express = require('express');

const { ServerConfig, EmailConfig } = require('./config');

const apiRoutes = require('./routes');

const app = express();

app.use('/api', apiRoutes);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(ServerConfig.PORT, async() => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    try {
        const response = await EmailConfig.mailSender.sendMail({
            subject: "Successfully booked Ticket",
            text: "fligth from DIB to DEL",
            from: ServerConfig.GMAIL_EMAIL,
            to: 'abc@gmail.com'
        })
        console.log('response :' , response);
    } catch (error) {
        console.log(error);
    }
});
