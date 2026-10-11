import nodemailer from "nodemailer";

const  transporter = nodemailer.createTransport(
    {
        service:"gmail",
        auth:{
            type: 'OAuth2',
            user:process.env.GOOGLE_USER,
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRATE,
            refreshToken:process.env.GOOGLE_REFRESH_TOKEN
        }
    }
)

transporter.verify()
   .then(()=>{console.log("Email transporter is ready for sending email")})
   .catch((err)=>{console.log("Email transporter verification is failed",err)})


export async function sendEmail({to,subject,text,html}){
    const mailOptions ={
        from:process.env.GOOGLE_USER,
        to,
        subject,
        text,
        html
    }

    const details = await transporter.sendMail(mailOptions)
    console.log("Email sent",details)
}   