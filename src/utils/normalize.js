export function normalize(items) {
  return new Map(items.map(item => [item.id, item]));
}
