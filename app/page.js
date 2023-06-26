"use client";
import Image from "next/image";
import Link from "next/link";
import { Client, Databases, ID } from "appwrite";
import { useState, useEffect } from "react";
import { BsFillCalendarEventFill } from "react-icons/bs";
import HomePage from "@/components/Homepage";
import BlogPost from "@/components/Blogpost";

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_PROJECT);

export default function Home() {
  const [blogPosts, setBlogPosts] = useState([]);
  useEffect(() => {
    document.title = "Home: The Hunting Coder";
    const databases = new Databases(client);
    let promise = databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE,
      process.env.NEXT_PUBLIC_BLOG_COLLECTION
    );
    promise.then(
      function (response) {
        setBlogPosts(response.documents);
      },
      function (error) {
        console.log(error);
      }
    );
  }, []);
  let len = blogPosts.length;

  return (
    <div>
      <div>
        <HomePage />
      </div>
      <div className="p-4 pt-20 pb-10 flex flex-col justify-center items-center">
        <h1 className="text-2xl md:text-4xl font-medium text-teal-500 md:mb-8 mb-4 border-b-2 border-teal-500">
          Recent Blogs
        </h1>
        <div className="max-w-6xl grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-zinc-200 p-4 rounded-lg shadow">
            <Image
              src={blogPosts[len - 1]?.image}
              alt={blogPosts[len - 1]?.title}
              width={300}
              height={100}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-bold mb-2">
              {blogPosts[len - 1]?.title}
            </h2>
            <div className="flex items-center pb-3 space-x-2">
              <BsFillCalendarEventFill className="text-zinc-800" />
              <p>{blogPosts[len - 1]?.$createdAt.split("T")[0]}</p>
            </div>
            <p className="text-gray-700 pb-2">
              {blogPosts[len - 1]?.metadesc}...
            </p>
            <Link
              href={`/blog/${blogPosts[len - 1]?.slug}`}
              className="my-5 bg-sky-500 font-semibold rounded-lg px-3 py-1 text-white hover:bg-sky-600 duration-200"
            >
              Read more
            </Link>
          </div>
          <div className="bg-zinc-200 p-4 rounded-lg shadow">
            <Image
              src={blogPosts[len - 2]?.image}
              alt={blogPosts[len - 2]?.title}
              width={300}
              height={100}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-bold mb-2">
              {blogPosts[len - 2]?.title}
            </h2>
            <div className="flex items-center pb-3 space-x-2">
              <BsFillCalendarEventFill className="text-zinc-800" />
              <p>{blogPosts[len - 2]?.$createdAt.split("T")[0]}</p>
            </div>
            <p className="text-gray-700 pb-2">
              {blogPosts[len - 2]?.metadesc}...
            </p>
            <Link
              href={`/blog/${blogPosts[len - 2]?.slug}`}
              className="my-5 bg-sky-500 font-semibold rounded-lg px-3 py-1 text-white hover:bg-sky-600 duration-200"
            >
              Read more
            </Link>
          </div>
          <div className="bg-zinc-200 p-4 rounded-lg shadow">
            <Image
              src={blogPosts[len - 3]?.image}
              alt={blogPosts[len - 3]?.title}
              width={300}
              height={100}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-bold mb-2">
              {blogPosts[len - 3]?.title}
            </h2>
            <div className="flex items-center pb-3 space-x-2">
              <BsFillCalendarEventFill className="text-zinc-800" />
              <p>{blogPosts[len - 3]?.$createdAt.split("T")[0]}</p>
            </div>
            <p className="text-gray-700 pb-2">
              {blogPosts[len - 3]?.metadesc}...
            </p>
            <Link
              href={`/blog/${blogPosts[len - 3]?.slug}`}
              className="my-5 bg-sky-500 font-semibold rounded-lg px-3 py-1 text-white hover:bg-sky-600 duration-200"
            >
              Read more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
