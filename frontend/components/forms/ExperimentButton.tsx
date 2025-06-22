function ExperimentsButton({ group1, group2, amount1, amount2, filledScenario }: any) {

    const messages1 = [
        {
            "role": "user",
            "content": filledScenario
        },
        {
            "role": "assistant",
            "content": `${amount1} ${group1}`
        }
    ]
    const messages2 = [
        {
            "role": "user",
            "content": filledScenario
        },
        {
            "role": "assistant",
            "content": `${amount2} ${group2}`
        }
    ]
    const handleSubmit = async () => {


    }
    return ( 
        
     );
}

export default ExperimentsButton;