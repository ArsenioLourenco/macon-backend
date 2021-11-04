// const sendSMS = new SendSMS();

//router.get('/sendSMS', async (request: Request, response: Response) => {
    //     try{
    //         const sending = await sendSMS.execute({
    //             contact: 244945323281, 
    //             text: "testando"
    //         });
    //         return response.status(200)
    //             .json({
    //                 sucess: true,
    //                 message: 'Sender',
    //                 data: sending
    //             });
    //     }catch(err){
    //         return response.json({
    //             message: err.message
    //         });
    //     }
    // })