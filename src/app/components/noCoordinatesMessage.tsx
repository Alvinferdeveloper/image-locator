import { AnimatePresence, motion } from "framer-motion";
import { MapPinOff as MapOff } from "lucide-react";
export default function NoCoordinatesMessage({ noCoordinates }: { noCoordinates?: boolean }) {
    return (
        <AnimatePresence>
            {
                noCoordinates && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="inset-0 absolute z-20 flex flex-col w-full h-auto items-center justify-center bg-black/70 rounded-2xl"
                    >
                        <MapOff className="w-20 h-20 text-yellow-400 mb-4" />
                        <p className="text-white text-lg font-semibold text-center">
                            Esta imagen no posee datos de ubicación
                        </p>
                    </motion.div>
                )
            }
        </AnimatePresence>
    )
}
