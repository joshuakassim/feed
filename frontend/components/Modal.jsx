/**
 * Modal Component
 *
 * Renders a centered modal dialog overlay.
 * Displays a title, close button, and custom content.
 * The modal is shown when isOpen is true and hidden otherwise.
 *
 * Props:
 * - isOpen: Boolean indicating whether the modal is visible.
 * - onClose: Function to call when the modal should be closed.
 * - title: String for the modal's header/title.
 * - children: React nodes to render as the modal's content.
 *
 * Usage:
 *   <Modal isOpen={isModalOpen} onClose={handleClose} title="Modal Title">
 *     {/* Modal content here *\/}
 *   </Modal>
 */

const Modal = ({ isOpen, onClose, title, children }) => {
  // If modal is not open, render nothing
  if (!isOpen) return null;
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4'>
      <div className='bg-white rounded-lg shadow-xl w-full max-w-md'>
        {/* Modal header with title and close button */}
        <div className='p-4 border-b flex justify-between items-center'>
          <h2 className='text-xl font-bold text-gray-800'>{title}</h2>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-800'
          >
            &times;
          </button>
        </div>
        {/* Modal content */}
        <div className='p-6'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
