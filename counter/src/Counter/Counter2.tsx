import {CounterDisplay} from "../components/CounterDisplay.tsx";
import {CounterButtons} from "../components/CounterButtons.tsx";
import {CounterSettings} from "../components/CounterSettings.tsx";
import {useState} from "react";

export const Counter2 = () => {
    const firstStartValue = 0;
    const firstMaxValue = 5;
    const mainAlert = "enter values and press 'set'";

    const [startValue, setStartValue] = useState(firstStartValue);
    const [maxValue, setMaxValue] = useState(firstMaxValue);
    const [displayValue, setDisplayValue] = useState(firstStartValue);
    const [inputFlag, setInputFlag] = useState(false);
    const [displayAlert, setDisplayAlert] = useState(mainAlert);
    const [inCorrectInput, setInCorrectInput] = useState(false);

    return (
        <>
            <CounterSettings
                setDisplayValue={setDisplayValue}
                setStartValue={setStartValue}
                setMaxValue={setMaxValue}
                setInputFlag={setInputFlag}
                setDisplayAlert={setDisplayAlert}
                startValue={startValue}
                maxValue={maxValue}
                mainAlert={mainAlert}
                setInCorrectInput={setInCorrectInput}
                inCorrectInput={inCorrectInput} setOnSettings={function (): void {
                throw new Error("Function not implemented.");
            }}/>
            <div className={"counter"}>
                <CounterDisplay
                    displayValue={displayValue}
                    maxValue={maxValue}
                    inputFlag={inputFlag}
                    displayAlert={displayAlert}
                    inCorrectInput={inCorrectInput}
                />
                <CounterButtons
                    displayValue={displayValue}
                    setDisplayValue={setDisplayValue}
                    startValue={startValue}
                    maxValue={maxValue}
                    inputFlag={inputFlag} setOnSettings={function (): void {
                    throw new Error("Function not implemented.");
                }}/>
            </div>
        </>
    )
};