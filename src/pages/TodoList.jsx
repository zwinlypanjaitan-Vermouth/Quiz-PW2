import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TodoForm from '../components/TodoForm.jsx'
import ConfirmModal from '../components/ConfirmModal.jsx'

const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v6M14 11v6" />
  </svg>
)

export default function TodoList({ todos, onAdd, onDelete }) {
  const navigate = useNavigate()
  const [showAdd, setShowAdd] = useState(false)
  const [toDelete, setToDelete] = useState(null)

  return (
    <main className="page">
      <header className="page-header">
        <h1>Todo List</h1>
        <button className="btn btn-blue" onClick={() => setShowAdd(true)}>Tambah Todo</button>
      </header>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Judul</th>
              <th>Status</th>
              <th>Prioritas</th>
              <th>Deadline</th>
              <th className="center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td className="truncate" title={todo.title}>{todo.title}</td>
                <td>{todo.status}</td>
                <td>{todo.priority}</td>
                <td>{todo.deadline}</td>
                <td className="center">
                  <div className="actions">
                    <button className="icon-btn icon-blue" aria-label={`Lihat detail ${todo.title}`} onClick={() => navigate(`/todo/${todo.id}`)}>
                      <EyeIcon />
                    </button>
                    <button className="icon-btn icon-red" aria-label={`Hapus ${todo.title}`} onClick={() => setToDelete(todo)}>
                      <TrashIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {todos.length === 0 && (
          <p className="empty">Belum ada tugas. Klik "Tambah Todo" untuk membuat tugas pertama.</p>
        )}
      </div>

      {showAdd && (
        <TodoForm
          mode="add"
          onCancel={() => setShowAdd(false)}
          onSubmit={(data) => {
            onAdd(data)
            setShowAdd(false)
          }}
        />
      )}

      {toDelete && (
        <ConfirmModal
          title="Hapus Todo"
          message={`Yakin ingin menghapus tugas "${toDelete.title}"?`}
          onCancel={() => setToDelete(null)}
          onConfirm={() => {
            onDelete(toDelete.id)
            setToDelete(null)
          }}
        />
      )}
    </main>
  )
}