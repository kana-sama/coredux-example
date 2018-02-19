import {
  createAction,
  createQuery,
  createNode,
  combineNodes,
  mergeNodes,
} from "coredux";

import { normalize } from "../utils";

export const fetchCommentsRequest = createAction();
export const fetchCommentsSuccess = createAction();

export const getIsFetching = createQuery();
export const getCommentsIds = createQuery();
export const getCommentsEntities = createQuery();

const isFetching = createNode(false)
  .setter(fetchCommentsRequest, true)
  .setter(fetchCommentsSuccess, false)
  .getter(getIsFetching);

const ids = createNode([])
  .setter(fetchCommentsSuccess, (ids, comments) => comments.map(c => c.id))
  .getter(getCommentsIds);

const entities = createNode(new Map())
  .setter(fetchCommentsSuccess, (entities, comments) => normalize(comments))
  .getter(getCommentsEntities);

export const comments = combineNodes({
  isFetching,
  ids,
  entities,
});
