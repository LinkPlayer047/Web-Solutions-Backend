import connectDB from "../config/db.js";
import nodemailer from "nodemailer";
import Contact from "../models/contact.js";

export const submitContact = async (req) => {
  try {
    await connectDB();
    const { name, email, organization, phone, website, message } = await req.json();

    const newMessage = new Contact({ name, email, organization, phone, website, message });
    await newMessage.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASS },
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

    return new Response(JSON.stringify({ message: "Form submitted successfully" }), { status: 200 });
  } catch (err) {
    console.error("Server Error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
};
