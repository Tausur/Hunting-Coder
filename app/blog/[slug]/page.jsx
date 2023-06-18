"use client"

import BlogPost from "@/components/Blogpost";
import { Client, Databases, ID, Query } from 'appwrite';
import { useState, useEffect } from 'react';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('648c81c007d2778a4df7');

export default function Blog({ params }) {

  const { slug } = params
  const [blogPost, setBlogPost] = useState()

  useEffect(() => {
    document.title = "Home: The Hunting Coder"
    const databases = new Databases(client)
    let promise = databases.listDocuments(
      "648c86d17456ab55cd59",
      "648c86e84b865b5718f2",
      [
        Query.equal('slug', slug)
      ]
    )
    promise.then(function (response) {
      setBlogPost(response.documents[0])
    }, function (error) {
      console.log(error)
    })
  }, [])

  return (
    <div>
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-3xl font-bold mb-4">{blogPost?.title}</h2>
        <img
          src={blogPost?.image}
          alt="Blog Post Image"
          className="w-full rounded-lg mb-4"
        />
        <p className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: blogPost?.content }}>
        </p>
      </div>
    </div>
  )
}