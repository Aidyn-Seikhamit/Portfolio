interface CounterDisplayProps {
    displayValue: number,
    maxValue: number
}

export const CounterDisplay = ({displayValue, maxValue}: CounterDisplayProps) => {
    return (
        <div className={"counter-display"}>
            <p className={displayValue === maxValue ? "maxValue" : "displayValue"}>{displayValue}</p>
        </div>
    )
}