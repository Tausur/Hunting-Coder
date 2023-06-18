"use client"
import Image from 'next/image'
import Link from 'next/link'
import { Client, Databases, ID } from 'appwrite';
import { useState, useEffect } from 'react';

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_PROJECT);

export default function Home() {

  const [blogPosts, setBlogPosts] = useState([])
  useEffect(()=>{
    document.title = "Home: The Hunting Coder"
    const databases = new Databases(client)
    let promise = databases.listDocuments(
      "648c86d17456ab55cd59",
      "648c86e84b865b5718f2"
    )
    promise.then(function(response){
      setBlogPosts(response.documents)
    }, function(error){
      console.log(error)
    })
  },[])

  return (
    <div>
      <div className="max-w-6xl mx-auto p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {blogPosts.map((post, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow">
          <Image
            src={post.image}
            alt={post.title}
            width={300}
            height={100}
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
          <h2 className="text-xl font-bold mb-2">{post.title}</h2>
          <p className="text-gray-700 pb-3">{post.metadesc}...</p>
          <Link href={`/blog/${post.slug}`} className="my-4 bg-sky-500 font-semibold rounded-lg px-3 py-1 text-white">Read more
          </Link>
        </div>
      ))}
    </div>

    </div>
  )
}
