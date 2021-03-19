import { get, set } from 'idb-keyval';

export function isBrowserSupported() {
  return !!window.showDirectoryPicker;
}

export async function initHandles() {
  try {
    const dirHandle = await getDirHandle();
    const requestHandle = await dirHandle.getFileHandle('request.json', { create: true });
    const responseHandle = await dirHandle.getFileHandle('response.json', { create: true });

    return {
      dirHandle,
      requestHandle,
      responseHandle
    };
  } catch (e) {
    clearDirHandle();
    throw e;
  }
}

export async function getDirHandle() {
  let dirHandle = await get('dirHandle');
  const options = { mode: 'readwrite' };

  if (dirHandle && (await dirHandle.queryPermission(options)) === 'granted') {
    return dirHandle;
  }

  if (dirHandle && (await dirHandle.requestPermission(options)) === 'granted') {
    return dirHandle;
  }

  dirHandle = await window.showDirectoryPicker();
  set('dirHandle', dirHandle);

  return dirHandle;
}

export async function clearDirHandle() {
  set('dirHandle', undefined);
}
