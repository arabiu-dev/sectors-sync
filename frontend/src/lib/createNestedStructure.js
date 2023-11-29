const createNestedStructure = (data, parentId = null) => {
  const result = [];

  for (const item of data) {
    if (item.parentId === parentId) {
      const children = createNestedStructure(data, item.id);

      if (children.length > 0) {
        result.push({
          ...item,
          subOptions: children,
        });
      } else {
        result.push({ ...item });
      }
    }
  }

  return result;
};

export default createNestedStructure;
