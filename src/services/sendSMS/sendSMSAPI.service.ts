interface ISendSMSAPI {
  text: string;
}

class SendSMSAPI {
  async execute({ text }: ISendSMSAPI) {
    try {
      const Vonage = require("@vonage/server-sdk"),
        vonage = new Vonage({
          apiKey: "ff6ae0b3",
          apiSecret: "G6hh2SZ0bcGcIW3h",
        }),
        from = "MACON - AGENDAMENTO",
        to = 244945323281;
      return vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
          console.log(err);
        } else {
          if (responseData.messages[0]["status"] === "0") {
            console.log("Message sent successfully.");
          } else {
            console.log(
              `Message failed with error: ${responseData.messages[0]["error-text"]}`
            );
          }
        }
      });
    } catch (err) {
      return err.message;
    }
  }
}

export default SendSMSAPI;
