"use client"

import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const StairTransition = () => {
    const pathname = usePathname();
    return <AnimatePresence mode="wait">
        StairTransition
    </AnimatePresence>;
}

export default StairTransition;