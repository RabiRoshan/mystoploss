import { useState, useEffect } from "react";
import "./App.css";
import { Typography, InputNumber, Switch } from "antd";

const { Text } = Typography;

function App() {
  const [positionType, setPositionType] = useState("buy");

  const [amount, setAmount] = useState(0);
  const [stoplossPercentage, setStoplossPercentage] = useState(0.3);
  const [targetPercentage, setTargetPercentage] = useState(0.5);

  const [stoplossAmount, setStoplossAmount] = useState(0);
  const [targetAmount, setTargetAmount] = useState(0);

  useEffect(() => {
    const stoplossValue = (amount * stoplossPercentage) / 100;
    const targetValue = (amount * targetPercentage) / 100;

    if (positionType === "buy") {
      setStoplossAmount(amount - stoplossValue);
      setTargetAmount(amount + targetValue);
    } else if (positionType === "sell") {
      setStoplossAmount(amount + stoplossValue);
      setTargetAmount(amount - targetValue);
    }
  }, [amount, stoplossPercentage, targetPercentage, positionType]);

  return (
    <div className="App">
      <div className="row">
        <div className="inputLabelContainer buySellToggle">
          <Text strong className="inputLabel">
            Sell
          </Text>
          <Switch
            defaultChecked
            checked={positionType === "buy"}
            onChange={(value) =>
              value ? setPositionType("buy") : setPositionType("sell")
            }
          />
          <Text strong className="inputLabel">
            Buy
          </Text>
        </div>
      </div>
      <div className="row">
        <div className="inputLabelContainer">
          <Text strong className="inputLabel">
            Amount:{" "}
          </Text>
          <InputNumber
            defaultValue={0}
            value={amount}
            step={0.1}
            formatter={(value) =>
              `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, "")
            }
            parser={(value) => value.replace(/₹\s?|(,*)/g, "")}
            onChange={(value) => setAmount(value)}
          />
        </div>
        <div className="inputLabelContainer">
          <Text strong className="inputLabel">
            Stoploss %:{" "}
          </Text>
          <InputNumber
            defaultValue={0}
            value={stoplossPercentage}
            step={0.1}
            min={0}
            max={100}
            formatter={(value) => `${value}%`}
            parser={(value) => value.replace("%", "")}
            onChange={(value) => setStoplossPercentage(value)}
          />
        </div>
        <div className="inputLabelContainer">
          <Text strong className="inputLabel">
            Target %:{" "}
          </Text>
          <InputNumber
            defaultValue={0}
            value={targetPercentage}
            step={0.1}
            min={0}
            max={100}
            formatter={(value) => `${value}%`}
            parser={(value) => value.replace("%", "")}
            onChange={(value) => setTargetPercentage(value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="inputLabelContainer">
          <Text strong className="inputLabel">
            Stoploss:{" "}
          </Text>
          <InputNumber
            defaultValue={0}
            value={stoplossAmount}
            step={0.1}
            formatter={(value) =>
              `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, "")
            }
            parser={(value) => value.replace(/₹\s?|(,*)/g, "")}
            disabled
          />
        </div>
        <div className="inputLabelContainer">
          <Text strong className="inputLabel">
            Target:{" "}
          </Text>
          <InputNumber
            defaultValue={0}
            value={targetAmount}
            step={0.1}
            formatter={(value) =>
              `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, "")
            }
            parser={(value) => value.replace(/₹\s?|(,*)/g, "")}
            disabled
          />
        </div>
      </div>
    </div>
  );
}

export default App;
