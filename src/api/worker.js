import retry from 'async-retry';

let ID_COUNTER = 1;

// naive file-based polled I/O with with "File System Access" API: https://wicg.github.io/file-system-access/
export async function doRequest(requestHandle, responseHandle, payload) {
  const request_id = ID_COUNTER++;

  const requestFile = await requestHandle.createWritable();
  await requestFile.write(JSON.stringify({ ...payload, request_id }));
  await requestFile.close();

  const data = await retry(async () => {
    const responseFile = await responseHandle.getFile();
    const responseText = await responseFile.text();
    const response = JSON.parse(responseText);

    if (response.request_id === request_id) {
      return response;
    } else {
      throw new Error('response timed out');
    }
  }, {
    retries: 10,
    factor: 1,
    minTimeout: 100,
    maxTimeout: 100,
  });

  return data;
}
