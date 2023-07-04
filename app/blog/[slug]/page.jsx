"use client";

import { Client, Databases, ID, Query } from "appwrite";
import { useState, useEffect } from "react";

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_PROJECT);

export default function Blog({ params }) {
  const { slug } = params;
  const [blogPost, setBlogPost] = useState();

  useEffect(() => {
    document.title = "Home: The Hunting Coder";
    const databases = new Databases(client);
    let promise = databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE,
      process.env.NEXT_PUBLIC_BLOG_COLLECTION,
      [Query.equal("slug", slug)]
    );
    promise.then(
      function (response) {
        setBlogPost(response.documents[0]);
      },
      function (error) {
        console.log(error);
      }
    );
  }, []);

  return (
    <div>
      <div className="max-w-4xl mx-auto p-4 text-white">
        <h2 className="md:text-3xl text-xl font-bold mb-4 py-2">
          {blogPost?.title}
        </h2>
        <img
          src={blogPost?.image}
          alt="Blog Post Image"
          className="w-full rounded-lg mb-4"
        />
        <p
          className="text-gray-200 mb-4"
          dangerouslySetInnerHTML={{ __html: blogPost?.content }}
        ></p>
      </div>
    </div>
  );
}
