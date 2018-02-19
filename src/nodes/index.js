import { combineNodes, createQuery } from "coredux";
import { createSelector } from "reselect";

import { denormalize } from "../utils";

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
        comments: denormalize(commentsById, post.commentsIds),
      }))
  )
);
