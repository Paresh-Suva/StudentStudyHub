export const STREAMS = {
    "Engineering": {
        branches: [
            "Computer Science",
            "Information Technology",
            "Mechanical Engineering",
            "Civil Engineering",
            "Electrical Engineering",
        ],
        semesters: ["1", "2", "3", "4", "5", "6", "7", "8"]
    },
    "Medical": {
        branches: [
            "MBBS",
            "B.Pharm",
        ],
        // Logic: MBBS uses Profs, others might use years/sems. 
        // We will handle specific logic in the UI or normalize here.
        // For simplicity, we define a generic academic timeline or specific sub-maps.
    }
} as const;

// Helper to get time units based on branch/stream
export const getAcademicUnits = (stream: string, branch: string) => {
    if (stream === "Medical") {
        if (branch === "MBBS") {
            return ["1st Prof", "2nd Prof", "3rd Prof (Part 1)", "3rd Prof (Part 2)"];
        }
        if (branch === "B.Pharm") {
            return ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6", "Sem 7", "Sem 8"];
        }
        return ["Year 1", "Year 2", "Year 3", "Year 4"];
    }

    // Default to Engineering Semesters
    return ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6", "Sem 7", "Sem 8"];
};
