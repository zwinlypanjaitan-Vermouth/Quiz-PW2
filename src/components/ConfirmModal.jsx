export default function ConfirmModal({ title, message, onConfirm, onCancel }) {
  return (
    <div className="overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <p>{message}</p>
        <div>
          <button type="button" onClick={onCancel}>Batal</button>
          <button type="button" onClick={onConfirm}>Hapus</button>
        </div>
      </div>
    </div>
  )
}