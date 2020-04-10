import twilio from 'twilio';
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
client.messages.create({
  body: 'Hello World!',
  from: process.env.TWILIO_PHONE_NUMBER,
  to: '+16463974810' //replace this with your registered phone number
})
.then(result => {
  console.log(result);
  return result.sid;
})
.then(sid => client.messages(sid).fetch())
.then(console.log);