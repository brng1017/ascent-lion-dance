// Keep featured services first while preserving the query order of other services.
export function sortServicesByFeatured<T extends { _id: string }>(
  services: readonly T[],
  featuredServices: readonly ({ _id: string } | null)[] = [],
) {
  const featuredIds = featuredServices.flatMap((service) =>
    service ? [service._id] : [],
  );
  const order = new Map(featuredIds.map((id, index) => [id, index]));
  return [...services].sort(
    (a, b) =>
      (order.get(a._id) ?? featuredIds.length) -
      (order.get(b._id) ?? featuredIds.length),
  );
}
