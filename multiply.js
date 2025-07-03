const num1 = document.querySelector("#number1");
const num2 = document.querySelector("#number2");
const num3 = document.querySelector("#number3");
const num4 = document.querySelector("#number4");

const result1 = document.querySelector(".result1");
const result2 = document.querySelector(".result2");

function setup(label, worker, field1, field2, result) {
  [field1, field2].forEach((input) => {
    input.onchange = () => {
      worker.port.postMessage([field1.value, field2.value]);
      console.log(label + ":Message posted to worker");
    };
  });

  worker.port.onmessage = (e) => {
    result1.textContent = e.data;
    console.log(label + ":Message received from worker");
    console.log(label + ":" + e.lastEventId);
  };
}

if (!!window.SharedWorker) {
    // Create with the extendedLifetime option.
    const worker1 = new SharedWorker("worker.js", {name: "extendedLifetime", extendedLifetime: true});
    setup("extendedLifetime", worker1, num1, num2, result1);

    const worker2 = new SharedWorker("worker.js", {name: "legacy"});
    setup("extendedLifetime", worker2, num3, num4, result2);
}
