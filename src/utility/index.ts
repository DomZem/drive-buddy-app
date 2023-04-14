export const extractFilenameFromUrl = (url: string): string => {
  const decodedUrl = decodeURIComponent(url);
  const regex = /\/([^/?]+)(?:\?.*)?$/;
  const match = decodedUrl.match(regex);

  if (match && match.length > 1) {
    return match[1];
  }
  return decodedUrl;
};
