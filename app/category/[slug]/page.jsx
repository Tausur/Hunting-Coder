"use client"
import { Client, Databases, ID, Query } from "appwrite";
import { useState, useEffect } from "react";
import Link from 'next/link'
import { BsFillCalendarEventFill } from "react-icons/bs";

const client = new Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_PROJECT);

const CategoryPage = ({ params }) => {
    const { slug } = params
	const [posts, setPosts] = useState({})
    let blogs = {}

    useEffect(() => {
        const databases = new Databases(client)
        let promise = databases.listDocuments(
            process.env.NEXT_PUBLIC_DATABASE,
            process.env.NEXT_PUBLIC_BLOG_COLLECTION,
        )
        promise.then(
            function(response) {
                response.documents.map((doc) => {
                    doc.tag.map((index) => {
                        if (slug === index) {
                            blogs[doc.slug] = doc
                        }
                    })
                })
						setPosts(blogs)
            },
            function(error) {
                console.log(error)
            }
        )
    })

    return (
        <div>
      <header className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">#{slug}</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.keys(posts).reverse()?.map((doc)=>{
            return(
              <div key={posts[doc].$id} className="bg-zinc-200 shadow-lg rounded-lg overflow-hidden">
              <img src={posts[doc].image} alt={posts[doc].title} className="w-full h-48 object-cover" />
              <div className="py-4 px-5">
								<div className="flex items-center pb-3 space-x-2">
            <BsFillCalendarEventFill className="text-zinc-800" />
            <p>{posts[doc].$createdAt.split("T")[0]}</p>
          </div>
                <h2 className="text-xl font-semibold mb-2">{posts[doc].title}</h2>
                <p className="text-gray-600">{posts[doc].metadesc}...</p>
                <Link href={`/blog/${doc}`} className="mt-4 inline-block bg-indigo-500 text-white px-4 py-2 rounded">
                  Read More
                </Link>
              </div>
            </div>
              )
          })}
        </div>
      </main>
    </div>
    );
};

export default CategoryPage;