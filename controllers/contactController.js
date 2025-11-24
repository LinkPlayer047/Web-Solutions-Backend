// controllers/contactController.js
import nodemailer from "nodemailer";
import Contact from "../models/Contact.js";

export const submitContact = async (req, res) => {  // <-- yeh name important hai
  try {
    const { name, email, organization, phone, website, message } = req.body;

    // Save in DB
    const newMessage = new Contact({ name, email, organization, phone, website, message });
    await newMessage.save();

    // Email Setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `New Query from ${name}`,
      html: `
        <h3>New Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Organization:</b> ${organization}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Website:</b> ${website}</p>
        <p><b>Message:</b><br>${message}</p>
      `,
    });

    res.status(200).json({ message: "Form submitted successfully" });

  } catch (err) {
    console.log("Email Error:", err);
    res.status(500).json({ error: "Email sending failed" });
  }
};
