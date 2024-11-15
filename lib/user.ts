export const users = [
    { email: "test1@gmail.com", role: "Supervisor" },
    { email: "test2@gmail.com", role: "Safety-Assessor" },
    { email: "test3@gmail.com", role: "Project-Manager" },
    { email: "test4@gmail.com", role: "Admin" },
]

export let logged_user = {}

export function setLoggedUser(user: { email: string, role: string }) {
    logged_user = user
}