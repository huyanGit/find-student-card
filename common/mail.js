const nodemailer = require('nodemailer');
const config = require('../config');
const mailUtil = {};
var transporter = nodemailer.createTransport(config.smtp);

// var mailOptions = {
//     from: '校园卡回收团队 <515253685@qq.com>',
//     to: 'hurryjack@qq.com', 
//     subject: '欢迎使用校园卡回收系统！',
//     html: '<b>您的丢卡信息我们已经收到，我们会在回收到您的校园卡后第一时间邮件通知您！</b>'
// };

// transporter.sendMail(mailOptions, function(error, info){
//     if(error){
//         console.log(error);
//     }else{
//         console.log('Message sent: ' + info.response);
//     }
// });

mailUtil.message1 = (card) => {
  transporter.sendMail({
    subject: '欢迎使用校园卡回收系统！',
    from: '校园卡回收团队 <515253685@qq.com>',
    to: card.email,
    text: '您的丢卡信息我们已经收到，我们会在回收到您的校园卡后第一时间邮件通知您！',
    html: '<p>您的丢卡信息:学号('+
          card.studentId+
          ')</p>'+
    			'<p>我们已经收到，我们会在回收到您的校园卡后第一时间邮件通知您！</p>'
  },senderHandle);
}
mailUtil.message2 = (notfoundcard, lostedcard) => {
  transporter.sendMail({
    subject: '欢迎使用校园卡回收系统！',
    from: '校园卡回收团队 <515253685@qq.com>',
    to: notfoundcard.email,
    text: '您的丢失的校园卡{{studentId}}已经成功被回收！',
    html: '<p>您的丢卡信息:学号('+
          notfoundcard.studentId+
          ')</p>'+
    			'<p>已经被回收，请您到'+
          lostedcard.lostedplace+
          '取卡！</p>'
  },senderHandle);
}

function senderHandle(err, info) {
  if(err){
    console.log(err);
  }else{
    console.log('Send email success');
  }
}

module.exports = mailUtil;
