import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: { name: "Developer Mode" },
  token: "bypass-token-developer",
  role: "superadmin", // Otomatis diset superadmin agar bypass hak akses menu

  setAuth: (user, token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    set({ user, token, role });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    set({ user: null, token: null, role: null });
  }
}));

export default useAuthStore;