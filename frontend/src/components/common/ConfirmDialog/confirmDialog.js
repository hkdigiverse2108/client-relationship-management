import Swal from "sweetalert2";
/**
 * Small wrapper around SweetAlert2 tuned to our theme.
 * Returns a promise resolving to `true` on confirm, `false` otherwise.
 */
export async function confirmDialog({ title = "Are you sure?", text = "This action cannot be undone.", confirmText = "Yes, proceed", cancelText = "Cancel", icon = "warning" } = {}) {
  const res = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#64748b",
    reverseButtons: true,
    focusCancel: true,
  });
  return res.isConfirmed;
}
