import { createAction, createQuery, createNode } from "coredux";
import { createSelector } from "reselect";

import { denormalize } from "../utils";

const defaultState = {
  ids: [],
  entities: new Map(),
};

export const addPost = createAction();

export const getPostsIds = createQuery();
export const getPostsEntities = createQuery();
export const getPosts = createQuery();

export const posts = createNode(defaultState)
  .setter(addPost, (state, post) => ({
    ids: [...state.ids, post.id],
    entities: new Map(state.entities).set(post.id, post),
  }))
  .getter(getPostsIds, select => state => state.ids)
  .getter(getPostsEntities, select => state => state.entities)
  .getter(getPosts, select =>
    createSelector(select(getPostsEntities), select(getPostsIds), denormalize)
  );
