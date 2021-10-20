import axios from "axios";

export interface ISendSMS{
    contact: number,
    text: string
}

export default class SendSMS{
    async execute({ contact, text } : ISendSMS){
        if(!contact || !text){
            return 'The distiny and text is obligatory';
        }
        try{
            const response = await axios.post(
                'http://52.30.114.86:8080/mimosms/v1/message/send?token=' +
                  process.env.SMS_API_KEY,
                {
                  sender: process.env.SMS_API_SENDER_ID,
                  recipients: contact,
                  text
                }
              );
        
              return response.status === 200 ? true : false;
        }catch(err){
            return err.message;
        }
    }
}