import { createContext, useCallback, useContext, useMemo, useState } from "react";

const AppointmentContext = createContext(null);

export function AppointmentProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [presetService, setPresetService] = useState("");

  const request = useCallback((service) => {
    setPresetService(service || "");
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, presetService, request, close }),
    [isOpen, presetService, request, close]
  );

  return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>;
}

export function useAppointment() {
  const context = useContext(AppointmentContext);
  if (!context) throw new Error("useAppointment must be used inside AppointmentProvider");
  return context;
}
