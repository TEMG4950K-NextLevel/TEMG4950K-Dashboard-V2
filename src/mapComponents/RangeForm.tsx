import React, { useState } from "react";
import { Col, InputNumber, Row, Slider, Space } from "antd";

const IntegerStep: React.FC = () => {
  const [inputValue, setInputValue] = useState(1);

  const onChange = (newValue: number) => {
    setInputValue(newValue);
  };

  return (
    <div>
      <Row>
        <Col span={12}>
          <Slider
            min={1}
            max={20}
            onChange={onChange}
            value={typeof inputValue === "number" ? inputValue : 0}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={1}
            max={20}
            style={{ margin: "0 16px" }}
            value={inputValue}
            onChange={onChange}
          />
        </Col>
      </Row>
    </div>
  );
};

const DecimalStep: React.FC = () => {
  const [inputValue, setInputValue] = useState(0);

  const onChange = (value: number) => {
    if (isNaN(value)) {
      return;
    }
    setInputValue(value);
  };

  return (
    <Row>
      <Col span={12}>
        <Slider
          min={0}
          max={1}
          onChange={onChange}
          value={typeof inputValue === "number" ? inputValue : 0}
          step={0.01}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={0}
          max={1}
          style={{ margin: "0 16px" }}
          step={0.01}
          value={inputValue}
          onChange={onChange}
        />
      </Col>
    </Row>
  );
};

const RangeForm: React.FC = () => (
  <div className="flex flex-col gap-2">
    <Space
      style={{ width: "100%" }}
      direction="vertical"
      className="rounded-xl bg-gray-800 shadow-[rgba(0,_0,_0,_0.35)_0px_4px_7px] px-4 py-3"
    >
      <div>Income range (HKD$)</div>
      <IntegerStep />
      <IntegerStep />
    </Space>

    <Space
      style={{ width: "100%" }}
      direction="vertical"
      className="rounded-xl bg-gray-800 shadow-[rgba(0,_0,_0,_0.35)_0px_4px_7px] px-4 py-3"
    >
      <div>Age range</div>
      <IntegerStep />
      <IntegerStep />
    </Space>

    <Space
      style={{ width: "100%" }}
      direction="vertical"
      className="rounded-xl bg-gray-800 shadow-[rgba(0,_0,_0,_0.35)_0px_4px_7px] px-4 py-3"
    >
      <div>Gender ratio</div>
      <DecimalStep />
    </Space>

    <button className="rounded-full bg-gray-800 shadow-[rgba(0,_0,_0,_0.35)_0px_4px_7px] py-3">
      Get recommendation
    </button>
  </div>
);

export default RangeForm;
