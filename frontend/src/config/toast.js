// Simple toast notification system
export function showToast(message, type = 'info') {
  // You can replace this with a library like react-toastify for production
  const toast = document.createElement('div');
  toast.innerText = message;
  toast.style.position = 'fixed';
  toast.style.bottom = '30px';
  toast.style.right = '30px';
  toast.style.background = type === 'error' ? '#e53e3e' : '#2b6cb0';
  toast.style.color = 'white';
  toast.style.padding = '12px 24px';
  toast.style.borderRadius = '8px';
  toast.style.zIndex = 9999;
  toast.style.fontSize = '1rem';
  toast.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => document.body.removeChild(toast), 500);
  }, 2500);
}
