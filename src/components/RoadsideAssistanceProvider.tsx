import { createContext, useContext, useState, type ReactNode } from "react";
import { Wrench, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RoadsideRequestDialog } from "@/components/RoadsideRequestDialog";
import type { ServiceId } from "@/config/roadside";

const AssistanceContext = createContext<(service: ServiceId) => void>(() => {});
export const useRoadsideAssistance = () => useContext(AssistanceContext);

export function RoadsideAssistanceProvider({ children }: { children: ReactNode }) {
  const [service, setService] = useState<ServiceId | null>(null);
  return (
    <AssistanceContext.Provider value={setService}>
      {children}
      <div className="fixed inset-x-4 bottom-4 z-40 flex justify-center pb-[env(safe-area-inset-bottom)] md:hidden">
        <Button variant="outline" onClick={() => setService("jump")} className="h-12 max-w-full gap-3 rounded-sm border-silver/40 bg-graphite px-5 text-xs uppercase tracking-widest shadow-lg">
          <Wrench size={16} /> Roadside Assistance <ArrowUpRight size={16} />
        </Button>
      </div>
      {service && <RoadsideRequestDialog key={service} initialService={service} onClose={() => setService(null)} />}
    </AssistanceContext.Provider>
  );
}