export default (data) => {
  const parser = new DOMParser();
  const rssXml = parser.parseFromString(data, 'application/xml');
  return rssXml;
};
