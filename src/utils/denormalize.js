export function denormalize(entities, ids = Array.from(entities.keys())) {
  return ids.map(id => entities.get(id));
}
