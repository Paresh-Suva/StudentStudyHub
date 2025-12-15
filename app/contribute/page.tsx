"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Cpu, HeartPulse, X, ChevronDown, Plus } from "lucide-react";
import { clsx } from "clsx";
import TracingBeamGrid from "@/components/TracingBeamGrid";
import { STREAMS, getAcademicUnits } from "@/lib/constants";
import { toast } from "sonner";
import { UploadDropzone } from "@/lib/uploadthing";

type StreamType = keyof typeof STREAMS;

// Subject Type from API
interface Subject {
    id: string;
    name: string;
}

export default function ContributePage() {
    const [title, setTitle] = useState("");
    const [stream, setStream] = useState<StreamType>("Engineering");
    const [branch, setBranch] = useState<string>(STREAMS["Engineering"].branches[0]);
    const [semester, setSemester] = useState<string>("1");

    // Subject Logic
    const [subjectId, setSubjectId] = useState<string>(""); // Store ID
    const [customSubjectName, setCustomSubjectName] = useState(""); // Store Name (Manual)
    const [isManualSubject, setIsManualSubject] = useState(false);

    const [availableSubjects, setAvailableSubjects] = useState<Subject[]>([]);
    const [isLoadingSubjects, setIsLoadingSubjects] = useState(false);

    // Derived state for dropdowns
    const availableBranches = STREAMS[stream].branches;
    const availableUnits = getAcademicUnits(stream, branch);

    // Cascading Reset Logic
    useEffect(() => {
        setBranch(STREAMS[stream].branches[0]);
    }, [stream]);

    useEffect(() => {
        const units = getAcademicUnits(stream, branch);
        setSemester(units[0]);
    }, [stream, branch]);

    // Fetch Subjects when dependencies change
    useEffect(() => {
        async function fetchSubjects() {
            setIsLoadingSubjects(true);
            setSubjectId("");
            setCustomSubjectName("");
            setIsManualSubject(false);

            try {
                const params = new URLSearchParams({
                    stream: stream,
                    branch: branch,
                    semester: semester
                });

                const res = await fetch(`/api/subjects?${params.toString()}`);
                if (res.ok) {
                    const data = await res.json();
                    setAvailableSubjects(data);
                }
            } catch (error) {
                console.error("Failed to fetch subjects", error);
            } finally {
                setIsLoadingSubjects(false);
            }
        }

        fetchSubjects();
    }, [stream, branch, semester]);


    const [resourceType, setResourceType] = useState<"Book" | "Notes" | "PYQ">("Notes");

    const [fileUrl, setFileUrl] = useState<string | null>(null); // New state for uploaded URL
    const [file, setFile] = useState<File | null>(null); // Keeping for visual mock if needed

    const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
    const [uploadProgress, setUploadProgress] = useState(0);


    const handleUpload = async () => {
        // Validation
        const validSubject = isManualSubject ? customSubjectName.length > 0 : subjectId.length > 0;

        if (!fileUrl || !title || !validSubject) return;

        setUploadStatus("uploading");
        setUploadProgress(80);

        try {
            // Prepare Payload
            const payload: any = {
                title,
                stream,
                branch,
                semester,
                type: resourceType,
                fileUrl
            };

            if (isManualSubject) {
                payload.newSubjectName = customSubjectName;
            } else {
                payload.subjectId = subjectId;
            }

            // Save metadata to DB
            const response = await fetch("/api/contribute", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error("Upload failed");

            setUploadProgress(100);
            setUploadStatus("success");
            toast.success("Contribution Submitted Successfully!");

        } catch (error) {
            console.error(error);
            setUploadStatus("error");
            setUploadProgress(0);
            toast.error("Upload Failed. Please try again.");
        }
    };

    // Handler for Subject Dropdown
    const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === "NEW") {
            setIsManualSubject(true);
            setSubjectId("");
        } else {
            setIsManualSubject(false);
            setSubjectId(value);
        }
    };

    return (
        <div className="relative w-full overflow-x-hidden bg-black text-white pt-32 pb-20 px-6">

            {/* Background */}
            <div className="absolute inset-0 z-0">
                <TracingBeamGrid />
            </div>

            <main className="relative z-10 mx-auto max-w-3xl">

                {/* Header */}
                <div className="text-center mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black tracking-widest mb-4"
                    >
                        THE KNOWLEDGE FORGE
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-zinc-400 text-lg"
                    >
                        Contribute to the neural net. Earn <span className="text-cyan-400 font-bold glow-cyan">+50 Rep</span> per approved upload.
                    </motion.p>
                </div>

                {/* The Upload Matrix Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A]/60 backdrop-blur-xl p-8 shadow-2xl"
                >
                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />

                    {uploadStatus === "success" ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="mb-6 rounded-full bg-green-500/10 p-6 ring-1 ring-green-500/50">
                                <CheckCircle2 className="h-16 w-16 text-green-500" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-2">TRANSMISSION COMPLETE</h2>
                            <p className="text-zinc-400 max-w-md">
                                Your file has been securely uploaded to the neural mainframe. It is now pending moderation.
                            </p>
                            <button
                                onClick={() => {
                                    setFile(null);
                                    setFileUrl(null);
                                    setTitle("");
                                    setUploadStatus("idle");
                                    setUploadProgress(0);
                                    setSubjectId("");
                                    setCustomSubjectName("");
                                    setIsManualSubject(false);
                                }}
                                className="mt-8 px-8 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-mono text-sm transition-colors"
                            >
                                UPLOAD ANOTHER
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-8">

                            {/* Error Message */}
                            {uploadStatus === "error" && (
                                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center font-bold">
                                    TRANSMISSION FAILED. CHECK CONNECTION.
                                </div>
                            )}

                            {/* SECTION A: Structure Selection */}
                            <div className="grid grid-cols-1 gap-6">
                                {/* 1. Stream Selector */}
                                <div className="space-y-2">
                                    <label className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider">Target Stream</label>
                                    <div className="flex gap-4">
                                        {(["Engineering", "Medical"] as const).map((s) => (
                                            <button
                                                key={s}
                                                onClick={() => setStream(s)}
                                                className={clsx(
                                                    "flex-1 flex items-center justify-center gap-3 py-4 rounded-xl border transition-all",
                                                    stream === s
                                                        ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                                                        : "bg-black/40 border-white/10 text-zinc-500 hover:border-white/30 hover:text-white"
                                                )}
                                            >
                                                {s === "Engineering" ? <Cpu className="h-5 w-5" /> : <HeartPulse className="h-5 w-5" />}
                                                <span className="font-bold tracking-tight">{s}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* 2. Branch & Semester (Grid) */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Branch Dropdown */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider">Branch / Specialization</label>
                                        <div className="relative">
                                            <select
                                                value={branch}
                                                onChange={(e) => setBranch(e.target.value)}
                                                className="w-full appearance-none bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-all font-medium"
                                            >
                                                {availableBranches.map((b) => (
                                                    <option key={b} value={b}>{b}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* Semester Dropdown */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider">Timeline</label>
                                        <div className="relative">
                                            <select
                                                value={semester}
                                                onChange={(e) => setSemester(e.target.value)}
                                                className="w-full appearance-none bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-all font-medium"
                                            >
                                                {availableUnits.map((u) => (
                                                    <option key={u} value={u}>{u}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                {/* 3. Subject Selector (Dynamic) */}
                                <div className="space-y-2">
                                    <label className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider flex justify-between">
                                        Subject
                                        {isManualSubject && (
                                            <button
                                                onClick={() => setIsManualSubject(false)}
                                                className="text-red-400 hover:text-red-300 flex items-center gap-1"
                                            >
                                                <X className="h-3 w-3" /> Select from List
                                            </button>
                                        )}
                                    </label>

                                    {isManualSubject ? (
                                        <div className="animate-in fade-in slide-in-from-top-2">
                                            <input
                                                type="text"
                                                value={customSubjectName}
                                                onChange={(e) => setCustomSubjectName(e.target.value)}
                                                placeholder="Enter exact Subject Name..."
                                                className="w-full bg-cyan-900/10 border border-cyan-500/30 rounded-xl px-4 py-3 text-cyan-200 placeholder-cyan-700/50 focus:outline-none focus:border-cyan-500 transition-all font-medium"
                                                autoFocus
                                            />
                                            <p className="text-[10px] text-zinc-500 mt-1 pl-1">
                                                * This will create a new subject in the database.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="relative">
                                            <select
                                                value={subjectId}
                                                onChange={handleSubjectChange}
                                                disabled={isLoadingSubjects}
                                                className="w-full appearance-none bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-all font-medium disabled:opacity-50"
                                            >
                                                <option value="" disabled>
                                                    {isLoadingSubjects ? "Loading..." : "Select Subject..."}
                                                </option>
                                                {availableSubjects.map((sub) => (
                                                    <option key={sub.id} value={sub.id}>{sub.name}</option>
                                                ))}
                                                <option disabled>──────────</option>
                                                <option value="NEW" className="text-cyan-400 font-bold">+ Create New Subject</option>
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* SECTION B: Metadata */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Resource Title */}
                                <div className="space-y-2">
                                    <label className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider">Resource Title</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="e.g. Thermodynamics Unit 1 Notes"
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all text-sm font-medium"
                                    />
                                </div>

                                {/* Resource Type */}
                                <div className="space-y-2">
                                    <label className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider">Format</label>
                                    <div className="flex bg-black/40 p-1 rounded-xl border border-white/10">
                                        {(["Book", "Notes", "PYQ"] as const).map((type) => (
                                            <button
                                                key={type}
                                                onClick={() => setResourceType(type as any)}
                                                className={clsx(
                                                    "flex-1 py-2 rounded-lg text-xs font-bold transition-all",
                                                    resourceType === type
                                                        ? "bg-white/10 text-white shadow-sm"
                                                        : "text-zinc-500 hover:text-zinc-300"
                                                )}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* SECTION C: Neural Dropzone (UploadThing) */}
                            <div className="space-y-2">
                                <label className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider">Payload</label>

                                {!fileUrl ? (
                                    <div className="rounded-xl border border-white/10 bg-black/40 overflow-hidden">
                                        <UploadDropzone
                                            endpoint="pdfUploader"
                                            appearance={{
                                                container: "border-zinc-800 hover:border-zinc-700 bg-transparent min-h-[200px]",
                                                label: "text-zinc-400 hover:text-white transition-colors",
                                                button: "bg-cyan-500 text-black font-bold hover:bg-cyan-400 ut-uploading:bg-cyan-500/50"
                                            }}
                                            onClientUploadComplete={(res) => {
                                                if (res && res[0]) {
                                                    setFileUrl(res[0].url);
                                                    setFile({ name: res[0].name } as File); // Visual Mock
                                                    toast.success("File attached successfully");
                                                }
                                            }}
                                            onUploadError={(error: Error) => {
                                                toast.error(`ERROR! ${error.message}`);
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <div className="relative group flex flex-col items-center justify-center w-full h-32 rounded-xl border border-cyan-500/30 bg-cyan-500/5">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                                                <FileText className="h-5 w-5" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-white font-bold text-sm">File Attached</p>
                                                <p className="text-cyan-500 text-xs font-mono">READY FOR SUBMISSION</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => { setFileUrl(null); setFile(null); }}
                                            className="absolute top-2 right-2 p-1 rounded-md text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* INITIATE BUTTON */}
                            <button
                                onClick={handleUpload}
                                disabled={!fileUrl || !title || (!isManualSubject && !subjectId) || (isManualSubject && !customSubjectName) || uploadStatus === "uploading"}
                                className={clsx(
                                    "w-full relative h-14 overflow-hidden rounded-xl font-black tracking-widest transition-all",
                                    !fileUrl || !title || (!isManualSubject && !subjectId) || (isManualSubject && !customSubjectName) ? "bg-zinc-900 text-zinc-700 cursor-not-allowed border border-white/5" : "bg-green-500 text-black hover:bg-green-400 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
                                )}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {uploadStatus === "uploading" ? (
                                        <>FINALIZING... {uploadProgress}%</>
                                    ) : (
                                        <>SUBMIT CONTRIBUTION</>
                                    )}
                                </span>
                            </button>

                        </div>
                    )}
                </motion.div>

            </main>
        </div>
    );
}
