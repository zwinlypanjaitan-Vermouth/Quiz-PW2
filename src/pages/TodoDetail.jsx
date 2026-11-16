import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TodoForm from '../components/TodoForm.jsx'

export default function TodoDetail({ todos, onUpdate }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [showEdit, setShowEdit] = useState(false)
  const todo = todos.find((t) => String(t.id) === id)

  if (!todo) {
    return (
      <main className="detail-wrap">
        <div className="detail-card" style={{ display: 'block', textAlign: 'center' }}>
          <p>Tugas tidak ditemukan.</p>
          <button className="btn btn-red" onClick={() => navigate('/')}>Kembali</button>
        </div>
      </main>
    )
  }

  return (
    <main className="detail-wrap">
      <section className="detail-card">
        <div>
          <h3 className="label">Judul</h3>
          <p className="value">{todo.title}</p>
          <h3 className="label">Deskripsi</h3>
          <div className="desc-box">{todo.description || '-'}</div>
        </div>
        <div>
          <h3 className="label">Status</h3>
          <p className="value">{todo.status}</p>
          <h3 className="label">Prioritas</h3>
          <p className="value">{todo.priority}</p>
          <h3 className="label">Deadline</h3>
          <p className="value">{todo.deadline}</p>
          <div className="btn-row left">
            <button className="btn btn-red" onClick={() => navigate('/')}>Kembali</button>
            <button className="btn btn-blue" onClick={() => setShowEdit(true)}>Update</button>
          </div>
        </div>
      </section>

      {showEdit && (
        <TodoForm
          mode="edit"
          initialData={todo}
          onCancel={() => setShowEdit(false)}
          onSubmit={(data) => {
            onUpdate(todo.id, data)
            setShowEdit(false)
          }}
        />
      )}
    </main>
  )
}