export const TextBlock = ({
    as: Tag = "p",
    text,
    icon: Icon,
    size = "text-base",
    weight = "font-normal",
    color = "text-dark",
    direction = "row",
    className = "",
    ...props
}) => {
    const directionClass =
        direction === "col"
            ? "flex flex-col items-center text-center"
            : "flex flex-row items-center gap-2 text-center";

    return (
        <Tag
            className={`${directionClass} ${size} ${weight} ${color} ${className}`}
            {...props}
        >
            {Icon && <Icon className="w-5 h-5" />}
            {text}
        </Tag>
    );
};

