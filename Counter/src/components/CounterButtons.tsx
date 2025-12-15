import type {Dispatch, SetStateAction} from "react";

type CounterButtonsProps = {
    displayValue: number,
    setDisplayValue: Dispatch<SetStateAction<number>>,
    startValue: number,
    maxValue: number,
}

export const CounterButtons = ({setDisplayValue, maxValue, displayValue, startValue}: CounterButtonsProps) => {
    return (
        <div className={"counter-buttons"}>
            <button disabled={displayValue === maxValue} onClick={() => setDisplayValue(displayValue + 1)}>inc</button>
            <button onClick={() => setDisplayValue(startValue)}>reset</button>
        </div>
    )
}