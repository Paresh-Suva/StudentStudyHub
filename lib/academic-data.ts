export const ACADEMIC_DATA = {
    engineering: {
        title: "Engineering",
        description: "Innovate and build the future.",
        branches: [
            {
                id: "cse",
                name: "Computer Science",
                icon: "Laptop",
                color: "from-blue-500 to-cyan-500",
                description: "Algorithms, Web Dev, AI & Data Structures."
            },
            {
                id: "it",
                name: "Information Tech",
                icon: "Wifi",
                color: "from-sky-500 to-indigo-500",
                description: "Network Security, Cloud Computing & IoT."
            },
            {
                id: "ece",
                name: "Electronics & Comm",
                icon: "Cpu",
                color: "from-violet-500 to-purple-500",
                description: "Circuits, Microprocessors & Communication Systems."
            },
            {
                id: "ee",
                name: "Electrical Engineering",
                icon: "Zap",
                color: "from-yellow-400 to-orange-500",
                description: "Power Systems, Machines & Control Systems."
            },
            {
                id: "civil",
                name: "Civil Engineering",
                icon: "Building",
                color: "from-orange-500 to-amber-500",
                description: "Structural Analysis, Surveying & Fluid Mechanics."
            },
            {
                id: "mechanical",
                name: "Mechanical",
                icon: "Settings",
                color: "from-red-500 to-orange-500",
                description: "Thermodynamics, Robotics & Manufacturing."
            }
        ]
    },
    medical: {
        title: "Medical",
        description: "Heal and serve humanity.",
        branches: [
            {
                id: "mbbs",
                name: "MBBS",
                icon: "Stethoscope",
                color: "from-emerald-500 to-teal-500",
                description: "Anatomy, Physiology & Clinical Practice."
            },
            {
                id: "bpharm",
                name: "B.Pharm",
                icon: "Pill",
                color: "from-teal-400 to-green-500",
                description: "Pharmaceutical Chemistry & Drug Safety."
            },
            {
                id: "bds",
                name: "Dental (BDS)",
                icon: "Smile",
                color: "from-blue-400 to-indigo-400",
                description: "Dental Surgery, Oral Pathology & Anatomy."
            },
            {
                id: "nursing",
                name: "Nursing",
                icon: "Heart",
                color: "from-pink-500 to-rose-500",
                description: "Patient Care, Health Promotion & Recovery."
            }
        ]
    }
} as const;
