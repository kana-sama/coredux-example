import { createStore } from "redux";

import { root, getPostsWithComments } from "./nodes";

import {
  fetchPostsRequest,
  fetchPostsSuccess,
  getArePostsFetching,
  getPosts,
} from "./nodes/posts";

import {
  fetchCommentsRequest,
  fetchCommentsSuccess,
  getAreCommentsFetching,
  getCommentsIds,
  getCommentsEntities,
} from "./nodes/comments";

const { dispatch, getState } = createStore(root.reducer);

const commentA = { id: 1, text: "comment A" };
const commentB = { id: 2, text: "comment B" };
const commentC = { id: 3, text: "comment C" };

const comments = [commentA, commentB, commentC];

const postA = { id: 1, text: "post", commentsIds: [commentA.id, commentB.id] };
const postB = { id: 2, text: "post 2", commentsIds: [commentC.id] };

const posts = [postA, postB];

test("coredux-example", () => {
  expect(root.select(getAreCommentsFetching)(getState())).toBe(false);
  dispatch(fetchCommentsRequest());
  expect(root.select(getAreCommentsFetching)(getState())).toBe(true);
  dispatch(fetchCommentsSuccess(comments));
  expect(root.select(getAreCommentsFetching)(getState())).toBe(false);

  expect(root.select(getCommentsIds)(getState())).toEqual([
    commentA.id,
    commentB.id,
    commentC.id,
  ]);

  const commentsValues = root
    .select(getCommentsEntities)(getState())
    .values();

  expect(commentsValues).toContain(commentA);

  expect(root.select(getArePostsFetching)(getState())).toBe(false);
  dispatch(fetchPostsRequest());
  expect(root.select(getArePostsFetching)(getState())).toBe(true);
  dispatch(fetchPostsSuccess(posts));
  expect(root.select(getArePostsFetching)(getState())).toBe(false);

  expect(root.select(getPosts)(getState())).toContain(postA);
  expect(root.select(getPostsWithComments)(getState())).toContainEqual({
    ...postA,
    comments: [commentA, commentB],
  });
});
