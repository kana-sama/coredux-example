import { createAction, createQuery, createNode } from "coredux";
import { createSelector } from "reselect";

const defaultState = {
  areFetching: false,
  ids: [],
  entities: new Map(),
};

export const fetchPostsRequest = createAction();
export const fetchPostsSuccess = createAction();

export const getArePostsFetching = createQuery();
export const getPostsIds = createQuery();
export const getPostsEntities = createQuery();
export const getPosts = createQuery();

export const posts = createNode(defaultState)
  .setter(fetchPostsRequest, state => ({ ...state, areFetching: true }))
  .setter(fetchPostsSuccess, (state, posts) => ({
    areFetching: false,
    ids: posts.map(post => post.id),
    entities: new Map(posts.map(post => [post.id, post])),
  }))
  .getter(getArePostsFetching, select => state => state.areFetching)
  .getter(getPostsIds, select => state => state.ids)
  .getter(getPostsEntities, select => state => state.entities)
  .getter(getPosts, select =>
    createSelector(
      select(getPostsEntities),
      select(getPostsIds),
      (entities, ids) => ids.map(id => entities.get(id))
    )
  );
