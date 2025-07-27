import { useState, useEffect } from "react";
import { fetchComments } from "../services/api";
import type { Comment } from "../types/types";

export const Comments = () => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetchComments().then((data) => setComments(data));
  }, []);

  return (
    <div>
      {comments.map((cmt) => (
        <div key={cmt.id}>
          <h3>#{cmt.postId} {cmt.name}</h3>
          <p>{cmt.email}</p>
          <p>{cmt.body}</p>
        </div>
      ))}
    </div>
  );
};