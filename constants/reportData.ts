import { Colors } from "./Colors";
import { report_types } from "./user";

export const report_list = [
    {
        type: report_types["reports"], reports: [
            {
                id: "415929374-1234", tags: [
                    { color: Colors.primary_blue, text: "Communication Record" },
                    { color: Colors.light_grey, text: "Tool box briefing" },
                ],
                Submitted: "4 Feb 22 at 14:05",
                navigate:"/communicationRecord"

            },
            {
                id: "415929374-1234", tags: [
                    { color: Colors.dark_red, text: "Incident Reporting" },
                    { color: Colors.light_grey, text: "Near Miss" },
                ],
                Submitted: "4 Feb 22 at 14:05",
                navigate:"/incidentReporting"

            },
            {
                id: "415929374-1234", tags: [
                    { color: Colors.dark_blue, text: "HSE Inspection" },
                ],
                Submitted: "4 Feb 22 at 14:05",
                navigate:"/hseInspection"

            },
            {
                id: "415929374-1234", tags: [
                    { color: Colors.purple, text: "Daily Checklist" },
                ],
                Submitted: "4 Feb 22 at 14:05"
            },
            {
                id: "415929374-1234", tags: [
                    { color: Colors.orange, text: "Incident Reporting" },
                ],
                Submitted: "4 Feb 22 at 14:05"
            },
            {
                id: "415929374-1234", tags: [
                    { color: Colors.green, text: "MS, RA and SWP" },
                ],
                Submitted: "4 Feb 22 at 14:05"
            }
        ]
    },
    {
        type: report_types["in-review"], reports: [
            {
                id: "PTW 415929374-1234", tags: [
                    { color: Colors.orange, text: "In Review" },
                    { color: Colors.purple, text: "Hot Work" },
                ],
                Issued: "4 Feb 22 at 14:05",
                Expiry: "8 Feb 22 at 18:00",
                Location: "Location of work",
                navigate:"/inReview"
            },
            {
                id: "PTW 415929374-1234", tags: [
                    { color: Colors.orange, text: "In Review" },
                    { color: Colors.light_grey, text: "Confined Space" },
                ],
                Issued: "4 Feb 22 at 14:05",
                Expiry: "8 Feb 22 at 18:00",
                Location: "Location of work",
                navigate:"/inReview"

            },
            {
                id: "PTW 415929374-1234", tags: [
                    { color: Colors.orange, text: "In Review" },
                    { color: Colors.light_grey, text: "Confined Space" },
                ],
                Issued: "4 Feb 22 at 14:05",
                Expiry: "8 Feb 22 at 18:00",
                Location: "Location of work",
                navigate:"/inReview"

            },
            {
                id: "PTW 415929374-1234", tags: [
                    { color: Colors.orange, text: "In Review" },
                    { color: Colors.dark_blue, text: "Working at Height" },
                ],
                Issued: "4 Feb 22 at 14:05",
                Expiry: "8 Feb 22 at 18:00",
                Location: "Location of work",
                navigate:"/inReview"

            },

        ]
    },
    {
        type: report_types["need-review"], reports: [
            {
                id: "PTW 415929374-1234", tags: [
                    { color: Colors.orange, text: "Need Review" },
                    { color: Colors.purple, text: "Hot Work" },
                ],
                Issued: "4 Feb 22 at 14:05",
                Expiry: "8 Feb 22 at 18:00",
                Location: "Location of work",
                navigate:"/inReview"
            },
            {
                id: "PTW 415929374-1234", tags: [
                    { color: Colors.orange, text: "Need Review" },
                    { color: Colors.light_grey, text: "Confined Space" },
                ],
                Issued: "4 Feb 22 at 14:05",
                Expiry: "8 Feb 22 at 18:00",
                Location: "Location of work",
                navigate:"/inReview"

            },
            {
                id: "PTW 415929374-1234", tags: [
                    { color: Colors.orange, text: "Need Review" },
                    { color: Colors.light_grey, text: "Confined Space" },
                ],
                Issued: "4 Feb 22 at 14:05",
                Expiry: "8 Feb 22 at 18:00",
                Location: "Location of work",
                navigate:"/inReview"

            },
            {
                id: "PTW 415929374-1234", tags: [
                    { color: Colors.orange, text: "Need Review" },
                    { color: Colors.dark_blue, text: "Working at Height" },
                ],
                Issued: "4 Feb 22 at 14:05",
                Expiry: "8 Feb 22 at 18:00",
                Location: "Location of work",
                navigate:"/inReview"

            },

        ]
    },
    {
        type: report_types["approved"], reports: [
            {
                id: "PTW 415929374-1234", tags: [
                    { color: Colors.green, text: "Approved" },
                    { color: Colors.light_grey, text: "Confined Space" },
                ],
                Issued: "4 Feb 22 at 14:05",
                Expiry: "8 Feb 22 at 18:00",
                Location: "Location of work",
                navigate:"/approved"

            },
            {
                id: "PTW 415929374-1234", tags: [
                    { color: Colors.green, text: "Approved" },
                    { color: Colors.purple, text: "Hot Work" },
                ],
                Issued: "4 Feb 22 at 14:05",
                Expiry: "8 Feb 22 at 18:00",
                Location: "Location of work",
                navigate:"/approved"

            },
            {
                id: "PTW 415929374-1234", tags: [
                    { color: Colors.green, text: "Approved" },
                    { color: Colors.light_grey, text: "Confined Space" },
                ],
                Issued: "4 Feb 22 at 14:05",
                Expiry: "8 Feb 22 at 18:00",
                Location: "Location of work",
                navigate:"/approved"

            },
            {
                id: "PTW 415929374-1234", tags: [
                    { color: Colors.green, text: "Approved" },
                    { color: Colors.dark_blue, text: "Working at Height" },
                ],
                Issued: "4 Feb 22 at 14:05",
                Expiry: "8 Feb 22 at 18:00",
                Location: "Location of work",
                navigate:"/approved"

            },


        ]
    },
    {
        type: report_types["rejected"], reports: [
            {
                id: "PTW 415929374-1234", tags: [
                    { color: Colors.dark_red, text: "Rejected" },
                    { color: Colors.purple, text: "Hot Work" },
                ],
                Issued: "4 Feb 22 at 14:05",
                Expiry: "8 Feb 22 at 18:00",
                Location: "Location of work",
                navigate:"/rejected"

            },
            {
                id: "PTW 415929374-1234", tags: [
                    { color: Colors.dark_red, text: "Rejected" },
                    { color: Colors.light_grey, text: "Confined Space" },
                ],
                Issued: "4 Feb 22 at 14:05",
                Expiry: "8 Feb 22 at 18:00",
                Location: "Location of work",
                navigate:"/rejected"

            },
            {
                id: "PTW 415929374-1234", tags: [
                    { color: Colors.dark_red, text: "Rejected" },
                    { color: Colors.light_grey, text: "Confined Space" },
                ],
                Issued: "4 Feb 22 at 14:05",
                Expiry: "8 Feb 22 at 18:00",
                Location: "Location of work",
                navigate:"/rejected"

            },
            {
                id: "PTW 415929374-1234", tags: [
                    { color: Colors.dark_red, text: "Rejected" },
                    { color: Colors.dark_blue, text: "Working at Height" },
                ],
                Issued: "4 Feb 22 at 14:05",
                Expiry: "8 Feb 22 at 18:00",
                Location: "Location of work",
                navigate:"/rejected"

            },



        ]
    },
    {
        type: report_types["completed"], reports: [
            {
                id: "PTW 415929374-1234", tags: [
                    { color: Colors.black, text: "Completed" },
                    { color: Colors.purple, text: "Hot Work" },
                ],
                Issued: "4 Feb 22 at 14:05",
                Expiry: "8 Feb 22 at 18:00",
                Location: "Location of work",
                navigate:"/completed"

            },
            {
                id: "PTW 415929374-1234", tags: [
                    { color: Colors.black, text: "Completed" },
                    { color: Colors.light_grey, text: "Confined Space" },
                ],
                Issued: "4 Feb 22 at 14:05",
                Expiry: "8 Feb 22 at 18:00",
                Location: "Location of work",
                navigate:"/completed"

            },
            {
                id: "PTW 415929374-1234", tags: [
                    { color: Colors.black, text: "Completed" },
                    { color: Colors.light_grey, text: "Confined Space" },
                ],
                Issued: "4 Feb 22 at 14:05",
                Expiry: "8 Feb 22 at 18:00",
                Location: "Location of work",
                navigate:"/completed"

            },
            {
                id: "PTW 415929374-1234", tags: [
                    { color: Colors.black, text: "Completed" },
                    { color: Colors.dark_blue, text: "Working at Height" },
                ],
                Issued: "4 Feb 22 at 14:05",
                Expiry: "8 Feb 22 at 18:00",
                Location: "Location of work",
                navigate:"/completed"

            },



        ]
    }
]