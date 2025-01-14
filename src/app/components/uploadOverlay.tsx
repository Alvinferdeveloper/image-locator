import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
export default function UploadOverlay({ isUploaded }: { isUploaded: boolean }) {
    return (
        <AnimatePresence>
            {isUploaded && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 rounded-2xl"
                >
                    <CheckCircle className="w-20 h-20 text-green-400" />
                </motion.div>
            )}
        </AnimatePresence>
    )
};