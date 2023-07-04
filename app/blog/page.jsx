"use client";
import { Client, Databases, ID } from "appwrite";
import { useState, useEffect } from "react";
import { BsFillCalendarEventFill } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import SearchBar from '@/components/SearchBar'

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_PROJECT);

export default function Blogs() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [docs, setDocs] = useState({})
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    document.title = "Home: The Hunting Coder";
    const databases = new Databases(client);
    let promise = databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE,
      process.env.NEXT_PUBLIC_BLOG_COLLECTION
    );
    promise.then(
      function (response) {
        setBlogPosts(response.documents.reverse());
      },
      function (error) {
        console.log(error);
      }
    );
  }, []);
  var id = 1
  let searchedBlogs = {}

  const handleSearch = (value) => {
    setSearchTerm(value);
    blogPosts.map((blog)=>{
      blog.title.toLowerCase().split(" ").map((word)=>{
        if(value.toLowerCase() === word){
          searchedBlogs[blog.slug] = blog
          setDocs(searchedBlogs)
        }
      })
    })
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <SearchBar handleSearch={handleSearch} />
      </div>
      <div className="max-w-6xl grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto py-10 px-4 md:px-0">
        {!searchTerm && blogPosts.map((post, index) => (
          <div key={index} className="bg-zinc-200 p-4 rounded-lg shadow">
            <Image
              src={post.image}
              alt={post.title}
              width={300}
              height={100}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <div className="flex flex-wrap space-x-2">
              {post.tag.map((i) => {
                id += 1
                return (
                  <Link href={`/category/${i}`} key={id} className="pb-1 cursor-pointer text-sm text-gray-700">#{i}</Link>
                )
              })}
            </div>
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <div className="flex items-center pb-3 space-x-2">
              <BsFillCalendarEventFill className="text-zinc-800" />
              <p>{post.$createdAt.split("T")[0]}</p>
            </div>
            <p className="text-gray-700 pb-2">{post.metadesc}...</p>
            <Link
              href={`/blog/${post.slug}`}
              className="my-5 bg-sky-500 font-semibold rounded-lg px-3 py-1 text-white hover:bg-sky-600 duration-200"
            >
              Read more
            </Link>
          </div>
        ))}
        {searchTerm && Object.keys(docs).map((doc)=>{
          return(
            <div key={docs[doc].$id} className="bg-zinc-200 p-4 rounded-lg shadow">
            <Image
              src={docs[doc].image}
              alt={docs[doc].title}
              width={300}
              height={100}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <div className="flex flex-wrap space-x-2">
              {docs[doc].tag.map((i) => {
                id += 1
                return (
                  <Link href={`/category/${i}`} key={id} className="pb-1 cursor-pointer text-sm text-gray-700">#{i}</Link>
                )
              })}
            </div>
            <h2 className="text-xl font-bold mb-2">{docs[doc].title}</h2>
            <div className="flex items-center pb-3 space-x-2">
              <BsFillCalendarEventFill className="text-zinc-800" />
              <p>{docs[doc].$createdAt.split("T")[0]}</p>
            </div>
            <p className="text-gray-700 pb-2">{docs[doc].metadesc}...</p>
            <Link
              href={`/blog/${docs[doc].slug}`}
              className="my-5 bg-sky-500 font-semibold rounded-lg px-3 py-1 text-white hover:bg-sky-600 duration-200"
            >
              Read more
            </Link>
          </div>
          )
        })}
      </div>
    </div>
  );
}
