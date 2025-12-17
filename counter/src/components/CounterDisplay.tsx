type CounterDisplayProps = {
    displayValue: number,
    maxValue: number,
    inputFlag: boolean,
    displayAlert: string,
    inCorrectInput: boolean
}

export const CounterDisplay = ({
                                   displayValue,
                                   maxValue,
                                   inputFlag,
                                   displayAlert,
                                   inCorrectInput
                               }: CounterDisplayProps) => {

    return (
        <div className={"counter-display"}>
            {inputFlag
                ? <p className={inCorrectInput ? "maxValue" : ""}>{displayAlert}</p>
                : <p className={displayValue === maxValue ? "maxValue" : ""}>{displayValue}</p>
            }
        </div>
    )
}