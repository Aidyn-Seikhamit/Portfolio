

type PropsType = {
    title: string
    onClick: () => void
    disabled?: boolean
    className?: string
}

export const Button = (props: PropsType) => {
    return (
        <button
            className={props.className}
            disabled={props.disabled}
            onClick={props.onClick}>{props.title}</button>
    )
}