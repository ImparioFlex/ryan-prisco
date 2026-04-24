"use client";

export default function ConfirmDeleteButton({
  label = "Delete",
  confirmText = "Delete this post? This cannot be undone.",
}: {
  label?: string;
  confirmText?: string;
}) {
  return (
    <button
      type="submit"
      className="admin-danger-btn"
      onClick={(e) => {
        if (!window.confirm(confirmText)) {
          e.preventDefault();
        }
      }}
    >
      {label}
    </button>
  );
}
