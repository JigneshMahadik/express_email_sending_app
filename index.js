const express = require("express");
const nodemailer = require('nodemailer');

const app = express();

app.use(express.json());

app.use(express.urlencoded());

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    service : "Gmail",
    auth :{
        user : process.env.user,
        pass : process.env.pass
    }
  });


app.get("/",(req,res)=>{

    res.send(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        .contact-form {
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 300px;
        }

        .contact-form h2 {
            margin-bottom: 20px;
            font-size: 24px;
            text-align: center;
        }

        .contact-form label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }

        .contact-form input[type="email"],
        .contact-form input[type="text"],
        .contact-form textarea {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 16px;
        }

        .contact-form textarea {
            height: 100px;
        }

        .contact-form button {
            width: 100%;
            padding: 10px;
            background-color: #007BFF;
            border: none;
            border-radius: 4px;
            color: #fff;
            font-size: 16px;
            cursor: pointer;
        }

        .contact-form button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>

    <div class="contact-form">
        <h2>Contact Us</h2>
        <form action="/send-mail" method="post">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>

            <label for="subject">Subject</label>
            <input type="text" id="subject" name="subject" required>

            <label for="message">Message</label>
            <textarea id="message" name="message" required></textarea>

            <button type="submit">Submit</button>
        </form>
    </div>

</body>
</html>

    `);

});

app.post("/send-mail",(req,res)=>{
    // console.log(req.body);
    
    // const atIndex = req.body.email.indexOf("@");
    // // Validate Email Address
    // if(!(atIndex > 0 && atIndex < req.body.email.length-1)){
    //     console.log("Email should be Ex: example@xyz");
    // }

  // Email options
  const mailOptions = {
    from: process.env.user,
    to: req.body.email,
    subject: req.body.subject,
    text: req.body.message
  };

   // Send email
   transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.send('Email sent successfully');
    }
  });

});

app.listen(8082,(req,res)=>{
    console.log("Server is up and running on port : 8082");
})