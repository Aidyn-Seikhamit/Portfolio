import {CounterDisplay} from "../components/CounterDisplay.tsx";
import {CounterButtons} from "../components/CounterButtons.tsx";
import {CounterSettings} from "../components/CounterSettings.tsx";
import {useState} from "react";

export const Counter3 = () => {
    const firstStartValue = 0;
    const firstMaxValue = 5;
    const mainAlert = "enter values and press 'set'";

    const [startValue, setStartValue] = useState(firstStartValue);
    const [maxValue, setMaxValue] = useState(firstMaxValue);
    const [displayValue, setDisplayValue] = useState(firstStartValue);
    const [inputFlag, setInputFlag] = useState(false);
    const [displayAlert, setDisplayAlert] = useState(mainAlert);
    const [inCorrectInput, setInCorrectInput] = useState(false);
    const [onSettings, setOnSettings] = useState(false)

    return (
        <div className={"counter"}>
            {onSettings ? <CounterSettings
                setDisplayValue={setDisplayValue}
                setStartValue={setStartValue}
                setMaxValue={setMaxValue}
                setInputFlag={setInputFlag}
                setDisplayAlert={setDisplayAlert}
                startValue={startValue}
                maxValue={maxValue}
                mainAlert={mainAlert}
                setInCorrectInput={setInCorrectInput}
                inCorrectInput={inCorrectInput}
                setOnSettings={setOnSettings}
            /> : <>
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
                    inputFlag={inputFlag}
                    setOnSettings={setOnSettings}
                />
            </>}

        </div>
    )
};