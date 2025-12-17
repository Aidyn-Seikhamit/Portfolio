import {CounterDisplay} from "../components/CounterDisplay.tsx";
import {CounterButtons} from "../components/CounterButtons.tsx";
import {useState} from "react";


export const Counter1 = () => {
    const startValue = 0;
    const maxValue = 5;

    const [displayValue, setDisplayValue] = useState(startValue);

    return (
        <div className={"counter"}>
            <CounterDisplay displayValue={displayValue} maxValue={maxValue} />
            <CounterButtons displayValue={displayValue} setDisplayValue={setDisplayValue} startValue={startValue} maxValue={maxValue} />
        </div>
    )
}