export function modifyUrl(url: string, quality: string) {
  const insertIndex = url.indexOf("upload/") + "upload/".length;
  const modifiedUrl =
    url.slice(0, insertIndex) + `${quality}/` + url.slice(insertIndex);

  return modifiedUrl;
}
