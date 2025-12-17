import {type Dispatch, type SetStateAction, useEffect} from "react";
import * as React from "react";

type CounterSettingsProps = {
    setDisplayValue: Dispatch<SetStateAction<number>>,
    setStartValue: Dispatch<SetStateAction<number>>,
    setMaxValue: Dispatch<SetStateAction<number>>,
    setInputFlag: Dispatch<SetStateAction<boolean>>,
    setDisplayAlert: Dispatch<SetStateAction<string>>,
    startValue: number,
    maxValue: number,
    mainAlert: string,
    setInCorrectInput: Dispatch<SetStateAction<boolean>>,
    inCorrectInput: boolean,
    setOnSettings: Dispatch<SetStateAction<boolean>>
}

export const CounterSettings = (
    {
        setDisplayValue,
        setStartValue,
        setMaxValue,
        setInputFlag,
        setDisplayAlert,
        startValue,
        maxValue,
        mainAlert,
        setInCorrectInput,
        inCorrectInput,
        setOnSettings
    }: CounterSettingsProps) => {

    useEffect(() => {
        localStorage.setItem("counterStart", JSON.stringify(startValue))
    }, [startValue])
    useEffect(() => {
        localStorage.setItem("counterMax", JSON.stringify(maxValue))
    }, [maxValue]);


    const onChangeMax = (e: React.ChangeEvent<HTMLInputElement>) => {
        maxValue = Number(e.currentTarget.value);
        if (Number(localStorage.getItem("counterStart")) > 0) {
            if (maxValue <= Number(localStorage.getItem("counterStart"))) {
                setInCorrectInput(true)
                setDisplayAlert("Incorrect max value");
            } else {
                setInCorrectInput(false)
                setDisplayAlert(mainAlert)
            }
        }
        setInputFlag(true)
        setMaxValue(maxValue);
    }

    const onChangeStart = (e: React.ChangeEvent<HTMLInputElement>) => {
        startValue = Number(e.currentTarget.value);
        if (startValue < 0 || startValue >= Number(localStorage.getItem("counterMax"))) {
            setInCorrectInput(true)
            setDisplayAlert("Incorrect start value");
        } else {
            setInCorrectInput(false)
            setDisplayAlert(mainAlert);
        }
        setInputFlag(true)
        setStartValue(startValue)
    }

    return (
        <div className={"counter"}>
            <div className={"settings-section"}>
                <label>{"max value : "}
                    <input value={maxValue} type="number" onChange={onChangeMax}/>
                </label>
                <label>{"start value : "}
                    <input value={startValue} type="number" onChange={onChangeStart}/>
                </label>
            </div>
            <div className={"settings-button"}>
                <button disabled={inCorrectInput} onClick={() => {
                    setDisplayValue(startValue)
                    setInputFlag(false)
                    setOnSettings(false)
                }}>set
                </button>
            </div>
        </div>
    )
};