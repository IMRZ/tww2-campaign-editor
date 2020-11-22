
export function isBrowserSupported() {
  return !!window.showDirectoryPicker;
}

export async function initHandles() {
  const dirHandle = await window.showDirectoryPicker({ recursive: true });
  const requestHandle = await dirHandle.getFileHandle('request.json', { create: true });
  const responseHandle = await dirHandle.getFileHandle('response.json', { create: true });

  return {
    dirHandle,
    requestHandle,
    responseHandle
  };
}
