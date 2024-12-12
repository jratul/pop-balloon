import { useState } from "react";
import { Range } from "react-range";
import styled from "@emotion/styled";
import { useLoadingStore } from "@store/useLoadingStore";
import Button from "./Button";
import { defaultSizeValue, maxSizeValue } from "src/constant";
import { Size } from "@model/model";

const Topper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

interface Props {
  resetBalloons: (size: Size) => void;
}

export default function ToolBox({ resetBalloons }: Props) {
  const { loading } = useLoadingStore();

  const [inputSize, setInputSize] = useState<number>(defaultSizeValue);

  const handleReset = () => {
    resetBalloons({ height: inputSize, width: inputSize });
  };

  const handleInputSizeChange = (newValues: number[]) => {
    const newValue = newValues[0];
    if (newValue >= 1 && newValue <= maxSizeValue) {
      setInputSize(newValue);
    }
  };

  return (
    <Topper>
      <Range
        min={1}
        max={10}
        step={1}
        values={[inputSize]}
        onChange={handleInputSizeChange}
        disabled={loading}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "6px",
              width: "200px",
              backgroundColor: "#fca5a5",
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            key={props.key}
            style={{
              ...props.style,
              height: "20px",
              width: "20px",
              borderRadius: "100%",
              backgroundColor: "#ef4444",
            }}
          />
        )}
      />
      <Button disabled={loading} onClick={handleReset}>
        <img src="/image/reset.svg" width={20} height={20} />
        다시하기({inputSize} x {inputSize})
      </Button>
    </Topper>
  );
}
