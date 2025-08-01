import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const DeleteTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const onDeleted = () => {
    alert("Transaction deleted successfully.");
    navigate("/all-transaction");
  };

  const onClose = () => {
    navigate(-1); // Go back to previous page
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/transactions/delete/${id}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        onDeleted();
      } else {
        alert("Failed to delete transaction.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Server error while deleting transaction.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full shadow-xl animate-fade-in">
        <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white text-center">
          🗑 Confirm Deletion
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
          Are you sure you want to delete this transaction? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-300 hover:bg-gray-400 rounded dark:bg-gray-600 dark:hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTransaction;
