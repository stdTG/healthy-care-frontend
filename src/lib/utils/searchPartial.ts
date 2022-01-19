const searchPartial = <T extends Record<string, any>>(
  searchString: string,
  items: T[],
  searchableFieldsResolvers: ((item: T) => string)[],
) => {
  return items.filter((item) => {
    return searchableFieldsResolvers.some((fn) =>
      fn(item)?.toLowerCase?.().includes(searchString.toLowerCase()),
    )
  })
}

export default searchPartial
