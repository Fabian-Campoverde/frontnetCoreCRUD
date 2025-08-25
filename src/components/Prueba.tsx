import React, { useEffect, useMemo, useState, type ReactNode } from "react";
import { Rnd } from "react-rnd";
import { FaUser, FaUsers, FaFileInvoice, FaBook, FaMoneyCheckAlt, FaCog, FaBell, FaBars } from "react-icons/fa";

type User = {
  id: number;
  name: string;
  email: string;
  roleId: number | null;
};
type Role = {
  id: number;
  name: string;
};

const USERS: User[] = [
  { id: 1, name: "Juan Pérez", email: "juan@example.com", roleId: 2 },
  { id: 2, name: "María López", email: "maria@example.com", roleId: 1 },
  { id: 3, name: "Carlos Díaz", email: "carlos@example.com", roleId: null },
  { id: 4, name: "Lucía Ramos", email: "lucia@example.com", roleId: 3 },
];
const ROLES: Role[] = [
  { id: 1, name: "Administrador" },
  { id: 2, name: "Editor" },
  { id: 3, name: "Usuario" },
  { id: 4, name: "Invitado" },
];

type DesktopWindowProps = {
  title: string;
  onClose: () => void;
  children: ReactNode;
  zIndex: number;
  default?: { x: number; y: number; width: number; height: number };
  onFocus?: () => void;
};

function DesktopWindow({
  title,
  onClose,
  children,
  zIndex,
  default: defaultProps = { x: 120, y: 100, width: 400, height: 340 },
  onFocus,
}: DesktopWindowProps) {
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({
    width: defaultProps.width,
    height: defaultProps.height,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
    if (maximized) {
      window.addEventListener("resize", handleResize);
      handleResize();
    }
    return () => window.removeEventListener("resize", handleResize);
  }, [maximized]);

  return (
    <Rnd
      default={defaultProps}
      minWidth={300}
      minHeight={120}
      bounds="window"
      disableDragging={minimized || maximized}
      enableResizing={!minimized && !maximized}
      size={
        maximized
          ? { width: windowSize.width, height: windowSize.height }
          : minimized
          ? { width: 220, height: 44 }
          : undefined
      }
      position={
        maximized
          ? { x: 0, y: 0 }
          : minimized
          ? { x: 20, y: window.innerHeight - 64 }
          : undefined
      }
      style={{
        zIndex,
        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
        borderRadius: 16,
        overflow: "hidden",
        background: "white",
        transition: "all 0.2s",
      }}
      onMouseDown={onFocus}
      dragHandleClassName="window-header"
    >
      <div className="window-header flex justify-between items-center bg-sky-700 text-white px-3 py-2 cursor-move select-none">
        <span className="font-semibold text-sm truncate">{title}</span>
        <div className="flex gap-1">
          <button
            className="hover:bg-white/20 rounded px-2"
            title={minimized ? "Restaurar" : "Minimizar"}
            onClick={() => setMinimized(m => !m)}
            type="button"
          >
            {minimized ? "🔼" : "🗕"}
          </button>
          <button
            className="hover:bg-white/20 rounded px-2"
            title={maximized ? "Restaurar" : "Maximizar"}
            onClick={() => setMaximized(m => !m)}
            type="button"
          >
            {maximized ? "🗗" : "🗖"}
          </button>
          <button className="hover:bg-white/20 rounded px-2" onClick={onClose} type="button">✕</button>
        </div>
      </div>
      {!minimized && (
        <div className="p-4 h-[calc(100%-40px)] overflow-auto">{children}</div>
      )}
    </Rnd>
  );
}

function EditUserForm({ user, roleName, onChange, onOpenRolePicker }: {
  user: User;
  roleName: string;
  onChange: (payload: Partial<User>) => void;
  onOpenRolePicker: () => void;
}) {
  const [form, setForm] = useState({ name: user.name, email: user.email });
  useEffect(() => { setForm({ name: user.name, email: user.email }); }, [user]);
  return (
    <form className="space-y-3">
      <input className="w-full border rounded px-3 py-2 mb-2" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} onBlur={() => onChange({ name: form.name })} placeholder="Nombre" />
      <input className="w-full border rounded px-3 py-2 mb-2" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} onBlur={() => onChange({ email: form.email })} placeholder="Email" />
      <div className="flex gap-2">
        <input className="w-full border rounded px-3 py-2 bg-slate-50" value={roleName} readOnly placeholder="Rol" />
        <button type="button" className="px-3 py-2 rounded bg-sky-600 text-white" onClick={onOpenRolePicker}>Buscar</button>
      </div>
      <div className="flex justify-end">
        <button type="button" className="px-4 py-2 rounded bg-emerald-600 text-white" onClick={() => onChange(form)}>Guardar</button>
      </div>
    </form>
  );
}

function RolePicker({ roles, selectedId, onPick }: {
  roles: Role[];
  selectedId: number | null;
  onPick: (role: Role) => void;
}) {
  return (
    <table className="w-full text-sm border rounded-xl overflow-hidden">
      <thead className="bg-slate-100">
        <tr>
          <th className="px-3 py-2 text-left">ID</th>
          <th className="px-3 py-2 text-left">Rol</th>
        </tr>
      </thead>
      <tbody>
        {roles.map(r => (
          <tr key={r.id} className={`cursor-pointer ${r.id === selectedId ? "bg-sky-100" : "hover:bg-sky-50"}`} onClick={() => onPick(r)}>
            <td className="px-3 py-2">{r.id}</td>
            <td className="px-3 py-2">{r.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SidebarMenu({ collapsed, setCollapsed }: { collapsed: boolean; setCollapsed: (v: boolean) => void }) {
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});
  const toggle = (key: string) => setOpen(o => ({ ...o, [key]: !o[key] }));
  return (
    <nav className={`h-full bg-sky-900 text-white ${collapsed ? "w-16" : "w-64"} flex-shrink-0 p-2 transition-all duration-200`}>
      <div className="flex items-center justify-between mb-6">
        <span className={`font-bold text-lg ${collapsed ? "hidden" : ""}`}>ERP Contable</span>
        <button className="text-white" onClick={() => setCollapsed(!collapsed)}><FaBars /></button>
      </div>
      <ul className="space-y-2">
        <li>
          <button className="w-full flex items-center gap-2 text-left px-2 py-2 rounded hover:bg-sky-800">
            <FaUser /> {!collapsed && "Dashboard"}
          </button>
        </li>
        <li>
          <button className="w-full flex items-center gap-2 text-left px-2 py-2 rounded hover:bg-sky-800" onClick={() => toggle("clientes")}>
            <FaUsers /> {!collapsed && "Clientes"}
            <span className="ml-auto">{!collapsed && (open.clientes ? "▲" : "▼")}</span>
          </button>
          {open.clientes && !collapsed && (
            <ul className="ml-6 mt-1 space-y-1">
              <li><button className="w-full text-left px-2 py-1 rounded hover:bg-sky-700">Listado</button></li>
              <li><button className="w-full text-left px-2 py-1 rounded hover:bg-sky-700">Nuevo Cliente</button></li>
            </ul>
          )}
        </li>
        <li>
          <button className="w-full flex items-center gap-2 text-left px-2 py-2 rounded hover:bg-sky-800" onClick={() => toggle("proveedores")}>
            <FaUsers /> {!collapsed && "Proveedores"}
            <span className="ml-auto">{!collapsed && (open.proveedores ? "▲" : "▼")}</span>
          </button>
          {open.proveedores && !collapsed && (
            <ul className="ml-6 mt-1 space-y-1">
              <li><button className="w-full text-left px-2 py-1 rounded hover:bg-sky-700">Listado</button></li>
              <li><button className="w-full text-left px-2 py-1 rounded hover:bg-sky-700">Nuevo Proveedor</button></li>
            </ul>
          )}
        </li>
        <li>
          <button className="w-full flex items-center gap-2 text-left px-2 py-2 rounded hover:bg-sky-800" onClick={() => toggle("facturacion")}>
            <FaFileInvoice /> {!collapsed && "Facturación"}
            <span className="ml-auto">{!collapsed && (open.facturacion ? "▲" : "▼")}</span>
          </button>
          {open.facturacion && !collapsed && (
            <ul className="ml-6 mt-1 space-y-1">
              <li><button className="w-full text-left px-2 py-1 rounded hover:bg-sky-700">Facturas</button></li>
              <li><button className="w-full text-left px-2 py-1 rounded hover:bg-sky-700">Notas de crédito</button></li>
            </ul>
          )}
        </li>
        <li>
          <button className="w-full flex items-center gap-2 text-left px-2 py-2 rounded hover:bg-sky-800" onClick={() => toggle("contabilidad")}>
            <FaBook /> {!collapsed && "Contabilidad"}
            <span className="ml-auto">{!collapsed && (open.contabilidad ? "▲" : "▼")}</span>
          </button>
          {open.contabilidad && !collapsed && (
            <ul className="ml-6 mt-1 space-y-1">
              <li><button className="w-full text-left px-2 py-1 rounded hover:bg-sky-700">Diario</button></li>
              <li><button className="w-full text-left px-2 py-1 rounded hover:bg-sky-700">Balance</button></li>
            </ul>
          )}
        </li>
        <li>
          <button className="w-full flex items-center gap-2 text-left px-2 py-2 rounded hover:bg-sky-800" onClick={() => toggle("bancos")}>
            <FaMoneyCheckAlt /> {!collapsed && "Bancos"}
            <span className="ml-auto">{!collapsed && (open.bancos ? "▲" : "▼")}</span>
          </button>
          {open.bancos && !collapsed && (
            <ul className="ml-6 mt-1 space-y-1">
              <li><button className="w-full text-left px-2 py-1 rounded hover:bg-sky-700">Cuentas</button></li>
              <li><button className="w-full text-left px-2 py-1 rounded hover:bg-sky-700">Movimientos</button></li>
            </ul>
          )}
        </li>
        <li>
          <button className="w-full flex items-center gap-2 text-left px-2 py-2 rounded hover:bg-sky-800" onClick={() => toggle("config")}>
            <FaCog /> {!collapsed && "Configuración"}
            <span className="ml-auto">{!collapsed && (open.config ? "▲" : "▼")}</span>
          </button>
          {open.config && !collapsed && (
            <ul className="ml-6 mt-1 space-y-1">
              <li><button className="w-full text-left px-2 py-1 rounded hover:bg-sky-700">Usuarios</button></li>
              <li><button className="w-full text-left px-2 py-1 rounded hover:bg-sky-700">Seguridad</button></li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}

function TopBar() {
  return (
    <header className="flex items-center justify-between bg-white shadow px-4 py-2 border-b">
      <div className="flex items-center gap-2">
        <FaBell className="text-sky-700" />
        <span className="text-xs text-gray-500">3 notificaciones</span>
      </div>
      <div className="flex items-center gap-2">
        <FaUser className="text-sky-700" />
        <span className="font-semibold text-sky-900">admin@erp.com</span>
      </div>
    </header>
  );
}

export default function DesktopLikeCRUD() {
  const [rows, setRows] = useState<User[]>(USERS);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showEditWin, setShowEditWin] = useState(false);
  const [showRoleWin, setShowRoleWin] = useState(false);
  const [zCounter, setZCounter] = useState(10);
  const [winStack, setWinStack] = useState<number[]>([0, 0]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const selectedUser = useMemo(() => rows.find(r => r.id === selectedId) || null, [rows, selectedId]);
  const selectedRole = useMemo(() => ROLES.find(r => r.id === selectedUser?.roleId) || null, [selectedUser?.roleId]);

  const getZ = (key: "edit" | "role") => {
    const idx = key === "edit" ? 0 : 1;
    return winStack[idx] || 0;
  };
  const bringToFront = (key: "edit" | "role") => {
    setZCounter(z => z + 1);
    setWinStack(stack => {
      const copy = [...stack];
      copy[key === "edit" ? 0 : 1] = zCounter + 1;
      return copy;
    });
  };

  const openEdit = () => { if (selectedUser) { setShowEditWin(true); setTimeout(() => bringToFront("edit"), 0); } };
  const openRolePicker = () => { setShowRoleWin(true); setTimeout(() => bringToFront("role"), 0); };
  const saveUser = (payload: Partial<User>) => {
    if (!selectedUser) return;
    setRows(prev => prev.map(r => r.id === selectedUser.id ? { ...r, ...payload } : r));
  };

  return (
    <div className="flex h-screen bg-slate-100">
      <SidebarMenu collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 flex flex-col p-2 sm:p-6 overflow-auto">
          <header className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <h1 className="text-2xl font-bold text-sky-900">Usuarios</h1>
            <div className="flex gap-2">
              <button
                className={`px-3 py-2 rounded-xl shadow ${selectedUser ? "bg-emerald-600 text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
                onClick={openEdit}
                disabled={!selectedUser}
              >
                Editar
              </button>
              <button
                className={`px-3 py-2 rounded-xl shadow ${selectedUser ? "bg-sky-600 text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
                onClick={openRolePicker}
                disabled={!selectedUser}
              >
                Asignar rol
              </button>
            </div>
          </header>
          <div className="bg-white rounded-2xl shadow border overflow-x-auto flex-1 flex flex-col">
            <table className="min-w-[600px] w-full text-sm">
              <thead className="bg-sky-100">
                <tr>
                  <th className="px-3 py-2 text-left w-10">Sel</th>
                  <th className="px-3 py-2 text-left">ID</th>
                  <th className="px-3 py-2 text-left">Nombre</th>
                  <th className="px-3 py-2 text-left">Email</th>
                  <th className="px-3 py-2 text-left">Rol</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(u => (
                  <tr
                    key={u.id}
                    className={`${u.id === selectedId ? "bg-sky-100" : "hover:bg-sky-50"} cursor-pointer`}
                    onClick={() => setSelectedId(u.id)}
                  >
                    <td className="px-3 py-2">
                      <input
                        type="checkbox"
                        checked={u.id === selectedId}
                        onChange={e => setSelectedId(e.target.checked ? u.id : null)}
                        onClick={e => e.stopPropagation()}
                      />
                    </td>
                    <td className="px-3 py-2">{u.id}</td>
                    <td className="px-3 py-2">{u.name}</td>
                    <td className="px-3 py-2">{u.email}</td>
                    <td className="px-3 py-2">{u.roleId ? ROLES.find(r => r.id === u.roleId)?.name : <span className="text-gray-400">—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Ventanas tipo escritorio */}
          {showEditWin && selectedUser && (
            <DesktopWindow
              title={`Editar usuario #${selectedUser.id}`}
              onClose={() => setShowEditWin(false)}
              zIndex={getZ("edit") || 30}
              onFocus={() => bringToFront("edit")}
              default={{ x: 200, y: 120, width: 400, height: 340 }}
            >
              <EditUserForm
                user={selectedUser}
                roleName={selectedRole?.name || ""}
                onChange={saveUser}
                onOpenRolePicker={openRolePicker}
              />
            </DesktopWindow>
          )}
          {showRoleWin && selectedUser && (
            <DesktopWindow
              title="Seleccionar Rol"
              onClose={() => setShowRoleWin(false)}
              zIndex={getZ("role") || 40}
              onFocus={() => bringToFront("role")}
              default={{ x: 320, y: 160, width: 340, height: 260 }}
            >
              <RolePicker
                roles={ROLES}
                selectedId={selectedUser.roleId ?? null}
                onPick={role => {
                  saveUser({ roleId: role.id });
                  setShowRoleWin(false);
                }}
              />
            </DesktopWindow>
          )}
        </main>
      </div>
    </div>
  );
}