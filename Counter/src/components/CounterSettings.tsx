import {type Dispatch, type SetStateAction} from "react";

type CounterSettingsProps = {
    setDisplayValue: Dispatch<SetStateAction<number>>,
    setStartValue: Dispatch<SetStateAction<number>>,
    setMaxValue: Dispatch<SetStateAction<number>>,
    setInputFlag: Dispatch<SetStateAction<boolean>>,
    setDisplayAlert: Dispatch<SetStateAction<string>>
}

export const CounterSettings = (
    {
        setDisplayValue,
        setStartValue,
        setMaxValue,
        setInputFlag,
        setDisplayAlert
    }: CounterSettingsProps) => {

    let inCorrectInput = false;

    return (
        <div className={"counter"}>
            <div className={"settings-section"}>
                <label>{"max value : "}
                    <input type="number" onClick={(e) => {
                        localStorage.setItem("counterMax", JSON.parse(e.currentTarget.value));
                        if (JSON.parse(e.currentTarget.value) <= Number(localStorage.getItem("counterStart"))) {
                            inCorrectInput = true;
                            setDisplayAlert("Incorrect max value");
                        }
                        setInputFlag(true)
                    }}/>
                </label>
                <label>{"start value : "}
                    <input type="number" onClick={(e) => {
                        localStorage.setItem("counterStart", JSON.parse(e.currentTarget.value));
                        if (JSON.parse(e.currentTarget.value) < 0 && JSON.parse(e.currentTarget.value) === Number(localStorage.getItem("counterMax")) ) {
                            inCorrectInput = true;
                            setDisplayAlert("Incorrect start value");
                        }
                        setInputFlag(true)
                    }}/>
                </label>
            </div>
            <div className={"settings-button"}>
                <button disabled={inCorrectInput} onClick={() => {
                    setDisplayValue(Number(localStorage.getItem("counterStart")))
                    setMaxValue(Number(localStorage.getItem("counterMax")))
                    setStartValue(Number(localStorage.getItem("counterStart")))
                    setInputFlag(false)
                }}>set
                </button>
            </div>
        </div>
    )
};