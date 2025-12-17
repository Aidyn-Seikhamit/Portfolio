import type {Dispatch, SetStateAction} from "react";

type CounterButtonsProps = {
    displayValue: number,
    setDisplayValue: Dispatch<SetStateAction<number>>,
    startValue: number,
    maxValue: number,
    inputFlag: boolean
}

export const CounterButtons = ({
                                   setDisplayValue,
                                   maxValue,
                                   displayValue,
                                   startValue,
                                   inputFlag
                               }: CounterButtonsProps) => {
    return (
        <div className={"counter-buttons"}>
            <button disabled={inputFlag || displayValue === maxValue} onClick={() => setDisplayValue(displayValue + 1)}>inc</button>
            <button disabled={inputFlag} onClick={() => setDisplayValue(startValue)}>reset</button>
        </div>
    )
}