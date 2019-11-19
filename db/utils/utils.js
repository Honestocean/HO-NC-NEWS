const formatDates = list => {
  if (list.length === 0) return list;
  return list.map(articleobj => {
    const copiedObj = { ...articleobj };
    copiedObj.created_at = new Date(copiedObj.created_at);
    return copiedObj;
  });
};

const makeRefObj = (list, key, value) => {
  if (list.length === 0) return {};
  refobj = {};
  for (let i = 0; i < list.length; i++) {
    refobj[list[i][key]] = list[i][value];
  }
  return refobj;
};

const formatComments = (comments, articleRef) => {
  if (comments.length === 0) return [];
  const format = formatDates(comments);
  for (let i = 0; i < format.length; i++) {
    const newValueLookup = format[i]["belongs_to"];
    const newValue = articleRef[newValueLookup];
    format[i]["article_id"] = newValue;
    delete format[i]["belongs_to"];
    format[i]["author"] = format[i]["created_by"];
    delete format[i]["created_by"];
  }
  return format;
};

module.exports = { formatDates, makeRefObj, formatComments };
