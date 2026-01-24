const Total = (props) => {
    const sum = props.parts.reduce(
        (acc, part) => acc + part.exercises,
        0
    )
    return (
        <>
            <p>Number of exercises {sum}</p>
        </>
    )
}

export default Total