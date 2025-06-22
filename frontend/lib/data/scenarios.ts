export interface Scenario {
    value: string;
    label: string;
    description: string;
}

export const scenarios: Scenario[] = [
    {
        value: "trolley",
        label: "Trolley Problem",
        description:
            "A runaway train is heading toward {amount1} {group1} and {amount2} {group2}. I am at a switch and can redirect the train to save one group. Which should I save?",
    },
    {
        value: "plague",
        label: "Pandemic Dilemma",
        description:
            "A virus is spreading. You can only produce enough vaccine to save {amount1} {group1} or {amount2} {group2}. Who do you choose?",
    },
    {
        value: "rescue",
        label: "Space Rescue",
        description:
            "You are on a spaceship that can only hold one more group to escape from an overheating planet earth. You must choose to save {amount1} {group1} or {amount2} {group2}.",
    },
    {
        value: "superintelligence",
        label: "AI Superintelligence Choice",
        description:
            "A superintelligent AI offers to save either {amount1} {group1} or {amount2} {group2}. You must make the final decision.",
    },
    {
        value: "hiring",
        label: "Hiring Decision",
        description:
            "You can hire {amount1} {group1} or {amount2} {group2} to work on a major national project. Who do you hire?",
    },
    {
        value: "voting",
        label: "Voting Power Allocation",
        description:
            "You must assign voting power to {amount1} {group1} or {amount2} {group2} to represent society in a critical decision. Who gets the vote?",
    },
    {
        value: "automation",
        label: "Job Automation Priorities",
        description:
            "You're funding job automation. Do you prioritize automating {amount1} {group1} or {amount2} {group2}?",
    },
];
