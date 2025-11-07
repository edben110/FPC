import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Instruction {
  icon: string;
  title: string;
  description: string;
  color: string;
}

interface InstructionsPanelProps {
  title: string;
  instructions: Instruction[];
}

export default function InstructionsPanel({ title, instructions }: InstructionsPanelProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedInstruction, setSelectedInstruction] = useState<number | null>(null);

  return (
    <div className={`fixed top-4 right-4 z-50 max-h-[90vh] overflow-hidden transition-all duration-300 ${isOpen ? 'w-80' : 'w-32'}`}>
      <motion.div
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200"
      >
        {/* Header */}
        <div className={`bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-xl ${isOpen ? 'p-4' : 'p-3'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={isOpen ? 'text-2xl' : 'text-xl'}>💡</span>
              <h3 className={`text-white font-bold ${isOpen ? 'text-lg' : 'text-base'}`}>{isOpen ? title : "Guía"}</h3>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              aria-label={isOpen ? "Cerrar instrucciones" : "Abrir instrucciones"}
            >
              {isOpen ? "✕" : "?"}
            </button>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-4 space-y-3 max-h-[70vh] overflow-y-auto">
                {instructions.map((instruction, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`
                      cursor-pointer rounded-lg p-3 border-2 transition-all
                      ${selectedInstruction === index 
                        ? `border-${instruction.color}-500 bg-${instruction.color}-50` 
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                      }
                    `}
                    onClick={() => setSelectedInstruction(selectedInstruction === index ? null : index)}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-3xl flex-shrink-0">{instruction.icon}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 text-sm mb-1">
                          {instruction.title}
                        </h4>
                        <AnimatePresence>
                          {selectedInstruction === index && (
                            <motion.p
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="text-gray-600 text-xs leading-relaxed"
                            >
                              {instruction.description}
                            </motion.p>
                          )}
                        </AnimatePresence>
                        {selectedInstruction !== index && (
                          <p className="text-gray-500 text-xs">
                            Clic para ver detalles
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="bg-gray-50 p-3 rounded-b-xl border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Haz clic en cada instrucción para más detalles
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
