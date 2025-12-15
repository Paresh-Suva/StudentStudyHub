// prisma/seed.ts
const { PrismaClient } = require('@prisma/client')

const prismaClient = new PrismaClient()

const SYLLABUS_DATA = {
    engineering: {
        computer: {
            "sem-1": ["Mathematics – I", "Physics", "Basic Electrical Eng.", "Engineering Graphics"],
            "sem-2": ["Mathematics – II", "Engineering Physics", "Basic Electronics", "Programming for Problem Solving"],
            "sem-3": ["Data Structures", "DBMS", "Digital Logic Design", "Probability & Statistics"],
            "sem-4": ["Operating Systems", "Computer Networks", "OOP with Java", "Computer Organization"],
            "sem-5": ["Analysis of Algorithms", "Cyber Security", "Web Technology", "Software Engineering"],
            "sem-6": ["Machine Learning", "Cloud Computing", "Compiler Design", "Cyber Security"],
            "sem-7": ["Big Data Analytics", "IoT", "Project Phase-I"],
            "sem-8": ["Project Phase-II", "AI & Deep Learning"]
        },
        it: {
            "sem-1": ["Mathematics – I", "Physics", "Basic Electrical Eng.", "Engineering Graphics"],
            "sem-2": ["Mathematics – II", "Engineering Physics", "Basic Electronics", "Programming for Problem Solving"],
            "sem-3": ["Data Structures", "Digital Electronics", "OOP with C++", "IT Fundamentals"],
            "sem-4": ["Operating Systems", "DBMS", "Software Engineering", "Computer Networks"],
            "sem-5": ["Web Programming", "Data Mining", "Artificial Intelligence"],
            "sem-6": ["Mobile Computing", "Cloud Computing", "Information Security"],
            "sem-7": ["Big Data Analytics", "IoT"],
            "sem-8": ["Project Phase-II"]
        },
        mechanical: {
            "sem-1": ["Mathematics – I", "Physics", "Basic Electrical Eng.", "Engineering Graphics"],
            "sem-3": ["Thermodynamics", "Strength of Materials", "Material Science"],
            "sem-5": ["Heat Transfer", "Dynamics of Machinery", "Production Tech"]
        },
        civil: {
            "sem-1": ["Mathematics – I", "Physics", "Basic Electrical Eng.", "Engineering Graphics"],
            "sem-3": ["Surveying", "Fluid Mechanics", "Geology"],
            "sem-5": ["Structural Analysis", "Concrete Technology", "Transportation Eng."]
        },
        ee: {
            "sem-1": ["Mathematics – I", "Physics", "Basic Electrical Eng.", "Engineering Graphics"],
            "sem-3": ["Network Theory", "Electrical Machines", "Analog Electronics"],
            "sem-5": ["Power Systems", "Power Electronics", "Electrical Drives"]
        }
    },
    medical: {
        mbbs: {
            "prof-1": ["Human Anatomy", "Physiology", "Biochemistry"],
            "prof-2": ["Pathology", "Microbiology", "Pharmacology"],
            "prof-3": ["Ophthalmology", "ENT", "Community Medicine"]
        }
    }
}

async function main() {
    console.log('🌱 Starting Seeding...')

    // Use 'as any' to bypass strict type checking for the nested object iteration
    const data: any = SYLLABUS_DATA;

    for (const streamKey in data) {
        const streamData = data[streamKey];
        for (const branchKey in streamData) {
            const branchData = streamData[branchKey];
            for (const semesterKey in branchData) {
                const subjects = branchData[semesterKey];
                for (const subjectName of subjects) {
                    await prismaClient.subject.upsert({
                        where: {
                            name_stream_branch_semester: {
                                name: subjectName,
                                stream: streamKey,
                                branch: branchKey,
                                semester: semesterKey.replace('sem-', '').replace('prof-', '')
                            }
                        },
                        update: {},
                        create: {
                            name: subjectName,
                            stream: streamKey,
                            branch: branchKey,
                            semester: semesterKey.replace('sem-', '').replace('prof-', '')
                        }
                    })
                }
            }
        }
    }
    console.log('✅ Seeding Completed!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prismaClient.$disconnect()
    })