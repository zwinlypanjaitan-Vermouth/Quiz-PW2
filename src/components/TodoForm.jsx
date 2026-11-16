import { useState } from 'react'
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from '../data/dummyTodos.js'

export default function TodoForm({ mode = 'add', initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState(
    initialData || {
      title: '',
      description: '',
      status: 'to-do',
      priority: 'low',
      deadline: '',
    }
  )
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!form.title.trim()) newErrors.title = 'Judul wajib diisi'
    if (!form.deadline) newErrors.deadline = 'Deadline wajib diisi'
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return
    onSubmit(form)
  }

  const isAdd = mode === 'add'

  return (
    <div className="overlay" onClick={onCancel}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit} noValidate>
        <h2 className="modal-title">{isAdd ? 'Tambah Todo' : 'Update Todo'}</h2>

        <label className="label" htmlFor="title">Judul</label>
        <input id="title" name="title" className="input" value={form.title} onChange={handleChange} />
        {errors.title && <p className="error">{errors.title}</p>}

        <label className="label" htmlFor="description">Deskripsi</label>
        <textarea id="description" name="description" className="input" rows={3} value={form.description} onChange={handleChange} />

        <div className="grid-2">
          <div>
            <label className="label" htmlFor="status">Status</label>
            <select id="status" name="status" className="input" value={form.status} onChange={handleChange}>
              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="priority">Prioritas</label>
            <select id="priority" name="priority" className="input" value={form.priority} onChange={handleChange}>
              {PRIORITY_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <label className="label" htmlFor="deadline">Deadline</label>
        <input id="deadline" name="deadline" type="date" className="input" value={form.deadline} onChange={handleChange} />
        {errors.deadline && <p className="error">{errors.deadline}</p>}

        <div className="btn-row">
          <button type="button" className="btn btn-red" onClick={onCancel}>Batal</button>
          <button type="submit" className="btn btn-blue">{isAdd ? 'Tambah' : 'Update'}</button>
        </div>
      </form>
    </div>
  )
}