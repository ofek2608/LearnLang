export default function PostResource({ resourceData }) {
  let { author, content, comments } = resourceData;
  return (
    <div>
      <h2>By {author}</h2>
      <p>{content}</p>
      {comments.map((comment,i) => (
        <p key={i}>{comment}</p>
      ))}
    </div>
  );
}
