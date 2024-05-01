export const uniqueItems = (array, key) => {
  return [...new Map(array.map((item) => [item[key], item])).values()]
}
export const treeData = (data) => {
  return data
    .map((item) => {
      const arr = data
        .filter((child) => item.id === child.parentId)
        .map((item) => ({
          value: item.id,
          label: item.name,
          children: item.children,
          parentId: item.parentId
        }))
      if (arr.length) {
        item.children = arr
      }
      return {
        value: item.id,
        label: item.name,
        children: item.children,
        parentId: item.parentId
      }
    })
    .filter((item) => !item.parentId)
}
