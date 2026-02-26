/**
 * Utilidad para sincronización entre pestañas usando localStorage events
 * Esta implementación permite que los cambios en una pestaña se reflejen en otras
 */

export const TAB_SYNC_KEY = "readList";

export class TabSync {
  private listeners: ((data: any) => void)[] = [];

  constructor() {
    // Escuchar cambios en localStorage desde otras pestañas
    window.addEventListener("storage", this.handleStorageChange);
  }

  private handleStorageChange = (event: StorageEvent) => {
    if (event.key === TAB_SYNC_KEY && event.newValue) {
      try {
        const data = JSON.parse(event.newValue);
        this.notifyListeners(data);
      } catch (error) {
        console.error("Error parsing storage data:", error);
      }
    }
  };

  private notifyListeners = (data: any) => {
    this.listeners.forEach(listener => listener(data));
  };

  // Suscribirse a cambios
  subscribe = (listener: (data: any) => void) => {
    this.listeners.push(listener);
    
    // Retornar función para unsuscribirse
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  };

  // Actualizar datos y notificar a otras pestañas
  update = (data: any) => {
    const dataString = JSON.stringify(data);
    localStorage.setItem(TAB_SYNC_KEY, dataString);
    
    // Disparar evento para sincronización inmediata en la misma pestaña
    window.dispatchEvent(new StorageEvent("storage", {
      key: TAB_SYNC_KEY,
      newValue: dataString
    }));
  };

  // Obtener datos actuales
  get = () => {
    const data = localStorage.getItem(TAB_SYNC_KEY);
    return data ? JSON.parse(data) : null;
  };

  // Limpiar
  destroy = () => {
    window.removeEventListener("storage", this.handleStorageChange);
    this.listeners = [];
  };
}
