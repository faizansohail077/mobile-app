export const users = [
    { email: "test1@gmail.com", role: "Supervisor", color: "rgba(224, 242, 241, 1)" },
    { email: "test2@gmail.com", role: "Safety-Assessor", color: "rgba(255, 243, 224, 1)" },
    { email: "test3@gmail.com", role: "Project-Manager", color: "rgba(241, 248, 233, 1)" },
    { email: "test4@gmail.com", role: "Admin", color: "rgba(232, 234, 246, 1)" },
]
export type Users = {
    email: string;
    role: string;
    color: string;
}

export const tab_list = [
    {
        role: "Supervisor", tabs: [
            { id: 0, text: "reports" },
            { id: 1, text: "In review" },
            { id: 2, text: "approved" },
            { id: 3, text: "rejected" },
            { id: 4, text: "completed" },
        ]
    }
]