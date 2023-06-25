"use client";

import Head from "next/head";
import { useState } from "react";
import { Client, Databases, ID } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_PROJECT);

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const databases = new Databases(client);

  const handleSubmit = (e) => {
    e.preventDefault();
    const promise = databases.createDocument(
      process.env.NEXT_PUBLIC_FEEDBACK_DATABASE_ID,
      process.env.NEXT_PUBLIC_FEEDBACK_COLLECTION_ID,
      ID.unique(),
      {
        name: name,
        email: email,
        message: message,
      }
    );

    promise.then(
      function (response) {
        alert("Thanks for your contacting with us. Stay tuned!");
      },
      function (error) {
        console.log(error); // Failure
      }
    );
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 bg-[url('/contact_bg.jpg')] bg-no-repeat bg-cover">
      <Head>
        <title>Contact - Hunting Coder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative  sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-3 bg-white mx-5 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="text-center">
              <h1 className="text-xl font-medium">Contact Us</h1>
              <p className="mt-2 text-sm text-gray-500">
                Get in touch with the Hunting Coder team
              </p>
            </div>
            <div className="my-1 mx-3">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                    placeholder="Your name"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                    placeholder="Your email address"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                    rows="4"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <div className="">
                  <button
                    type="submit"
                    className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
