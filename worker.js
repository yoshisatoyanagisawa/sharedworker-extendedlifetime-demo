let previousResult = '';
onconnect = function (event) {
  const port = event.ports[0];

  port.onmessage = function (e) {
    const workerResult = `Result: ${e.data[0] * e.data[1]}`;
    let result = workerResult;
    if (previousResult) {
      result += ", Previous" + previousResult;
    }
    port.postMessage(result);
    previousResult = workerResult;
  };
};
