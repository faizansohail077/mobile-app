export const user_role = {
    ["Supervisor"]: "Supervisor",
    ["Safety-Assessor"]: "Safety-Assessor",
    ["approved"]: "approved",
    ["Project-Manager"]: "Project-Manager",
    ["Admin"]: "Admin",
}

export const users = [
    { email: "test1@gmail.com", role: user_role["Supervisor"], color: "rgba(224, 242, 241, 1)" },
    { email: "test2@gmail.com", role: user_role["Safety-Assessor"], color: "rgba(255, 243, 224, 1)" },
    { email: "test3@gmail.com", role: user_role["Project-Manager"], color: "rgba(241, 248, 233, 1)" },
    { email: "test4@gmail.com", role: user_role["Admin"], color: "rgba(232, 234, 246, 1)" },
]
export type Users = {
    email: string;
    role: string;
    color: string;
}




export const report_types = {
    ["reports"]: "reports",
    ["in-review"]: "In review",
    ["approved"]: "approved",
    ["rejected"]: "rejected",
    ["completed"]: "completed",
}

export const tab_list = [
    {
        role: "Supervisor", tabs: [
            { id: 0, text: report_types["reports"] },
            { id: 1, text: report_types["in-review"] },
            { id: 2, text: report_types["approved"] },
            { id: 3, text: report_types["rejected"] },
            { id: 4, text: report_types["completed"] },
        ]
    }
]

