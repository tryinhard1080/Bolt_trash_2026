import { toast } from 'sonner';

/** Copy helper with a graceful fallback for non-secure contexts. */
export async function copyText(value: string, message = 'Copied to clipboard') {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
    } else {
      const el = document.createElement('textarea');
      el.value = value;
      el.setAttribute('readonly', '');
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(el);
      if (!ok) throw new Error('execCommand failed');
    }
    toast.success(message, { duration: 2600 });
    return true;
  } catch {
    toast.error('Clipboard blocked by this browser. Select the text instead.');
    return false;
  }
}
