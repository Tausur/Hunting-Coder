const BlogPost = ({ title,content,image }) => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <img
        src={image}
        alt="Blog Post Image"
        className="w-full rounded-lg mb-4"
      />
      <p className="text-gray-700 mb-4">
        {content}
      </p>
    </div>
  );
};

export default BlogPost;
