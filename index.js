const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const PORT = 8000;

const credentials = {
  apiKey: "db5a88fd6e9a96f5465befa1ae35db2735c7a0ac06b9557a2a1211abb2988925",
  username: "Dataisprotected",
};
const AfricasTalking = require("africastalking")(credentials);
const sms = AfricasTalking.SMS;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", (req, res) => {
  const { phoneNumber, text } = req.body;

  if (text === "") {
    console.log(text);

    response = `CON Welcome 
        1. Name
        2. Email `;
  } else if (text === "1") {
    response = `CON Verify your email address
        1. Email `;
  } else if (text.startsWith("1*1*")) {
    const email = text.split("*")[2];
    console.log(email);

    // Check if the selected slot number is valid
    const slotIndex = parseInt(selectedSlot) - 1;
    if (slotIndex >= 0 && slotIndex < slots.length) {
      const selectedSlotValue = slots[slotIndex];

      console.log(selectedSlotValue);

      // Call the function to send the SMS with the selected slot information
      sendsms(selectedSlotValue);

      // Provide a response to the user
      response = `END You have selected an appointment for ${selectedSlotValue}. You will receive a confirmation SMS shortly.`;
    } else {
      response = "END Invalid slot selection. Please try again.";
    }
  }

  function sendsms(selectedSlotValue) {
    //   const credentials = {
    //     apiKey: "##",
    //     username: "##",
    //   };
    const AfricasTalking = require("africastalking")(credentials);
    const sms = AfricasTalking.SMS;

    const message = `Your appointment has been booked for ${selectedSlotValue}`;

    // Send the SMS
    const options = {
      to: phoneNumber,
      message: message,
    };

    sms
      .send(options)
      .then((response) => {
        console.log("SMS sent successfully:", response);
      })
      .catch((error) => {
        console.error("Error sending SMS:", error);
      });
  }

  if (text === "2") {
    console.log("wwwwwww");
    const credentialss = {
      apiKey: "##",
      username: "###",
    };

    // Initialize the SDK
    const AfricasTalkings = require("africastalking")(credentialss);

    // Get the voice service
    const voice = AfricasTalkings.VOICE;

    function makeCall(phoneNumber1) {
      const options = {
        callFrom: "+254730731029",

        callTo: [phoneNumber1],
      };

      console.log("calling");
      voice.call(options).then(console.log).catch(console.log);
    }

    makeCall(phoneNumber);

    response = `END you will receive a call shortly `;
  }

  // Print the response onto the page so that our gateway can read it
  res.set("Content-Type: text/plain");

  res.send(response);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
