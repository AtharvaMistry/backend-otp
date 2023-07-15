const express = require('express');
const twilio = require('twilio');
const app = express();
const accountSid = 'AC9a95bc6bc8b5d596fe21d9cdf13d12e8';
const authToken = '83f040f83560c5f2e081baddf81761b1';
const verifySid = 'VAb031ee89e0b62a83bb3f335565108324';
const client = twilio(accountSid, authToken);

app.use(express.json());

app.post('/sendOTP', (req, res) => {
    const { phoneNumber } = req.body;

client.verify
    .services(verifySid)
    .verifications.create({ to: `+${phoneNumber}`, channel: 'sms' })
    .then((verification) => {
        console.log(verification.status);
        res.json({ success: true, message: 'OTP sent successfully' });
    })
    .catch((error) => {
        console.error('Error sending OTP:', error);
        res.status(500).json({ success: false, message: 'Failed to send OTP' });
    });
});

app.post('/verifyOTP', (req, res) => {
    const { phoneNumber, otpCode } = req.body;

    client.verify
    .services(verifySid)
    .verificationChecks.create({ to: `+${phoneNumber}`, code: otpCode })
    .then((verificationCheck) => {
        console.log(verificationCheck.status);
        res.json({ success: true, message: 'OTP verified successfully' });
    })
    .catch((error) => {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ success: false, message: 'Failed to verify OTP' });
    });
});

app.get('/event', (req, res) => {
    res.send("hello jaimeen!");
})

console.log(app._events.request);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
