import {CounterDisplay} from "../components/CounterDisplay.tsx";
import {CounterButtons} from "../components/CounterButtons.tsx";
import {CounterSettings} from "../components/CounterSettings.tsx";
import {useState} from "react";

export const Counter2 = () => {
    const firstStartValue = 0;
    const firstMaxValue = 5;

    const [startValue, setStartValue] = useState(firstStartValue);
    const [maxValue, setMaxValue] = useState(firstMaxValue);
    const [displayValue, setDisplayValue] = useState(firstStartValue);
    const [inputFlag, setInputFlag] = useState(true);
    const [displayAlert, setDisplayAlert] = useState("enter values and press 'set'")


    // const onChangeMaxValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (inputFlag) {
    //         inputFlag = false;
    //         buttonFlag = true;
    //         displayAlert = "enter values and press 'set'"
    //     }
    //     setMaxValue(Number(e.currentTarget.value));
    // };
    //
    // const onChangeStartValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (inputFlag) {
    //         inputFlag = false;
    //         buttonFlag = true;
    //         displayAlert = "enter values and press 'set'"
    //     }
    //     setStartValue(Number(e.currentTarget.value));
    // };

    return (
        <>
            <CounterSettings
                setDisplayValue={setDisplayValue}
                setStartValue={setStartValue}
                setMaxValue={setMaxValue}
                setInputFlag={setInputFlag}
                setDisplayAlert={setDisplayAlert}
            />
            <div className={"counter"}>
                <CounterDisplay
                    displayValue={displayValue}
                    maxValue={maxValue}
                    inputFlag={inputFlag}
                    displayAlert={displayAlert}
                />
                <CounterButtons
                    displayValue={displayValue}
                    setDisplayValue={setDisplayValue}
                    startValue={startValue}
                    maxValue={maxValue}
                    inputFlag={inputFlag}
                />
            </div>
        </>
    )
};