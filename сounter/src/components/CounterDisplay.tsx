type CounterDisplayProps = {
    displayValue: number,
    maxValue: number,
    inputFlag: boolean,
    displayAlert: string,
}

export const CounterDisplay = ({
                                   displayValue,
                                   maxValue,
                                   inputFlag,
                                   displayAlert,
                               }: CounterDisplayProps) => {

    return (
        <div className={"counter-display"}>
            <p className={displayValue === maxValue ? "maxValue" : "displayValue"}>{inputFlag ? displayAlert : displayValue}</p>
        </div>
    )
}