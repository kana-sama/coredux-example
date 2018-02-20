import { createAction, createQuery, createNode, combineNodes } from "coredux";

export const fetchCommentsRequest = createAction();
export const fetchCommentsSuccess = createAction();

export const getAreCommentsFetching = createQuery();
export const getCommentsIds = createQuery();
export const getCommentsEntities = createQuery();

const areFetching = createNode(false)
  .setter(fetchCommentsRequest, true)
  .setter(fetchCommentsSuccess, false)
  .getter(getAreCommentsFetching);

const ids = createNode([])
  .setter(fetchCommentsSuccess, (ids, comments) =>
    comments.map(comment => comment.id)
  )
  .getter(getCommentsIds);

const entities = createNode(new Map())
  .setter(
    fetchCommentsSuccess,
    (entities, comments) =>
      new Map(comments.map(comment => [comment.id, comment]))
  )
  .getter(getCommentsEntities);

export const comments = combineNodes({
  areFetching,
  ids,
  entities,
});
