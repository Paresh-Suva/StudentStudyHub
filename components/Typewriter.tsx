"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TypewriterProps {
    words: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseDuration?: number;
}

export default function Typewriter({
    words,
    typingSpeed = 100,
    deletingSpeed = 50,
    pauseDuration = 2000,
}: TypewriterProps) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const word = words[currentWordIndex];

        let timer: NodeJS.Timeout;

        if (isDeleting) {
            timer = setTimeout(() => {
                setCurrentText((text) => text.slice(0, -1));
            }, deletingSpeed);
        } else {
            timer = setTimeout(() => {
                setCurrentText((text) => word.slice(0, text.length + 1));
            }, typingSpeed);
        }

        if (!isDeleting && currentText === word) {
            // Finished typing, wait before deleting
            clearTimeout(timer);
            timer = setTimeout(() => setIsDeleting(true), pauseDuration);
        } else if (isDeleting && currentText === "") {
            // Finished deleting, move to next word
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }

        return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

    return (
        <span className="inline-flex items-center">
            <span>{currentText}</span>
            <motion.span
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    times: [0, 0.5, 0.5, 1],
                    ease: "linear"
                }}
                className="ml-1 inline-block h-[1em] w-[4px] bg-green-500 align-middle"
            />
        </span>
    );
}
