import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { Button, Input, Table } from "antd";

export default function LinearGraph() {
  const [model, setModel] = useState();
  const [xaxios, setXAxios] = useState();
  const [result, setResult] = useState();
  const [dataSource, setDataSource] = useState([]);

  const handleTrain = async () => {
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

    model.compile({ loss: "meanSquaredError", optimizer: "sgd" });

    const xs = tf.tensor2d([-1, 0, 1, 2, 3, 4], [6, 1]);
    const ys = tf.tensor2d([-3, -1, 1, 3, 5, 7], [6, 1]);

    await model.fit(xs, ys, { epochs: 250 });
    console.log("model ---", model);
    setModel(model);
  };

  const handlePredict = () => {
    const predict = model
      .predict(tf.tensor2d([Number(xaxios)], [1, 1]))
      .dataSync();
    setResult(predict);
    dataSource.push({
      input: xaxios,
      output: predict[0],
      actual: 2 * xaxios + 1,
      diff: 2 * xaxios + 1 - predict[0],
    });
    setDataSource([...dataSource]);
  };

  const columns = [
    {
      title: "Input",
      dataIndex: "input",
      key: "input",
    },
    {
      title: "Output",
      dataIndex: "output",
      key: "output",
    },
    {
      title: "Actual",
      dataIndex: "actual",
      key: "actual",
    },
    {
      title: "Diff",
      dataIndex: "diff",
      key: "diff",
    },
  ];

  console.log("dataousrce ---", dataSource);

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
        <Table columns={columns} dataSource={dataSource} />
      </div>
    </div>
  );
}
