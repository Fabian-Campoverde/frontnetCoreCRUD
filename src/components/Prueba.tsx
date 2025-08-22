import { useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

const users: User[] = [
  { id: 1, name: "Juan Pérez", email: "juan@example.com" },
  { id: 2, name: "María López", email: "maria@example.com" },
  { id: 3, name: "Carlos Díaz", email: "carlos@example.com" },
];

export default function TablaConBotonesYModal() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [modalType, setModalType] = useState<"detalle" | "editar" | null>(null);

  const selectedUser = users.find(u => u.id === selectedId);

  const handleSelect = (id: number) => {
    setSelectedId(id === selectedId ? null : id);
  };

  const openModal = (type: "detalle" | "editar") => {
    if (selectedId) {
      setModalType(type);
    } else {
      alert("Selecciona un usuario primero");
    }
  };

  const closeModal = () => setModalType(null);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Usuarios</h1>
      {/* Botones */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => openModal("detalle")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Ver Detalle
        </button>
        <button
          onClick={() => openModal("editar")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Editar
        </button>
      </div>
      {/* Tabla */}
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2">✔</th>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr
              key={u.id}
              className={`cursor-pointer ${selectedId === u.id ? "bg-blue-200" : "hover:bg-blue-100"}`}
              onClick={() => handleSelect(u.id)}
            >
              <td className="border border-gray-300 px-4 py-2 text-center" onClick={e => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={selectedId === u.id}
                  onChange={() => handleSelect(u.id)}
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">{u.id}</td>
              <td className="border border-gray-300 px-4 py-2">{u.name}</td>
              <td className="border border-gray-300 px-4 py-2">{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal */}
      {modalType && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            {modalType === "detalle" && (
              <>
                <h2 className="text-lg font-bold mb-4">Detalle del usuario</h2>
                <p><strong>ID:</strong> {selectedUser.id}</p>
                <p><strong>Nombre:</strong> {selectedUser.name}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
              </>
            )}
            {modalType === "editar" && (
              <>
                <h2 className="text-lg font-bold mb-4">Editar usuario</h2>
                <label className="block mb-2">
                  Nombre:
                  <input
                    type="text"
                    defaultValue={selectedUser.name}
                    className="border p-2 w-full rounded"
                  />
                </label>
                <label className="block mb-2">
                  Email:
                  <input
                    type="email"
                    defaultValue={selectedUser.email}
                    className="border p-2 w-full rounded"
                  />
                </label>
                <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                  Guardar
                </button>
              </>
            )}
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}