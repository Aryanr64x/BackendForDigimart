import asyncHandler from 'express-async-handler';
import nodemailer from 'nodemailer'
import { v4 as uuidv4 } from 'uuid';

import { prisma, s } from '../app.js'


const sendEmail = async (links, email) => {

    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,

        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });



    let linkString = ""
    links.forEach((link) => {
        linkString += link
        linkString += " "
    })

    try {
        let info = await transporter.sendMail({
            from: '"Team Digimart 👻" <aryansaketr64x@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Thanks for purchasing, Here is your link", // Subject line
            text: "Here is the downloadable link to your product. Thanks for shopping at digimart " + linkString, // plain text body

        });

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        return true
    } catch (e) {
        console.log(e)
        return false
    }



}

export const pay = asyncHandler(async (req, res) => {
    const { lineItems } = req.body
    const priceIds = []

    lineItems.forEach((item) => {
        priceIds.push(item.price)
    })

    console.log(priceIds)
    const session = await s.checkout.sessions.create({
        line_items: lineItems,
        customer: req.body.user.customer_id,
        mode: 'payment',
        success_url: "https://digimartt.netlify.app/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: 'http://digimartt.netlify.app/cancel',
        metadata: {
            priceIds: JSON.stringify(priceIds)
        },

    })
    res.json({
        url: session.url
    })

});


export const onSessionComplete = asyncHandler(async (req, res) => {
    const event = req.body.data.object;
    const priceIds = JSON.parse(event.metadata.priceIds)
    console.log("Now I am logging the JSON body")
   
    const links =  await prisma.asset.findMany({
        where: {
            priceId: {
                in: priceIds
            }
        },
        select: {
            link: true
        }
    })
    //extract links from assets put it in links and send it to mail
    await sendEmail(links, event.customer_details.email);
    res.json("completed successfuly")
})



