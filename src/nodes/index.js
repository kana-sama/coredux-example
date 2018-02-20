import { combineNodes, createQuery } from "coredux";
import { createSelector } from "reselect";

import { comments, getCommentsEntities } from "./comments";
import { posts, getPosts } from "./posts";

export const getPostsWithComments = createQuery();

export const root = combineNodes({
  comments,
  posts,
}).getter(getPostsWithComments, select =>
  createSelector(
    select(getPosts),
    select(getCommentsEntities),
    (posts, commentsById) =>
      posts.map(post => ({
        ...post,
        comments: post.commentsIds.map(id => commentsById.get(id)),
      }))
  )
);
