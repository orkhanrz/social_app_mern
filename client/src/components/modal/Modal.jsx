import './modal.css';

export default function Modal({children}) {
  return (
    <div className="modal">
        <div className="modalContainer card">
        {children}
        </div>
    </div>
  )
}