import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { Button, Input } from "antd";

export default function LinearGraph() {
  const [model, setModel] = useState();
  const [xaxios, setXAxios] = useState();
  const [result, setResult] = useState();

  const handleTrain = async () => {
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

    model.compile({ loss: "meanSquaredError", optimizer: "sgd" });

    const xs = tf.tensor2d([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [10, 1]);
    const ys = tf.tensor2d([1, 2, 5, 10, 17, 26, 37, 50, 65, 82], [10, 1]);

    await model.fit(xs, ys, { epochs: 1000 });
    console.log("model ---", model);
    setModel(model);
  };

  const handlePredict = () => {
    const predict = model.predict(tf.tensor2d([9], [1, 1])).dataSync();
    setResult(predict);
  };

  return (
    <div className="h-full w-full p-4">
      <div className="mb-2">
        <Button onClick={handleTrain}>Train & Make Model</Button>
      </div>
      <div>
        <div className="flex gap-2">
          <Input
            className="mb-2"
            value={xaxios}
            onChange={(evt) => setXAxios(evt.target.value)}
          />
          <Button onClick={handlePredict}>Predict</Button>
        </div>
        <div>
          <label>Result: {result}</label>
        </div>
      </div>
    </div>
  );
}
