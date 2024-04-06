export const uniqueItems = (array, key) => {
  return [...new Map(array.map((item) => [item[key], item])).values()]
}