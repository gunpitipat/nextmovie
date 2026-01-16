'use client';

import { toast } from 'sonner';
import { FiX } from 'react-icons/fi';

export function showToast(message: string) {
  return toast.custom((id) => (
    <div
      // Sonner switches to desktop layout at 600px and uses 356px as default toast width.
      // Use min-[600px]:w-[356px] to preserve correct bottom-center positioning.
      className="bg-highlight shadow-muted relative left-1/2 w-full -translate-x-1/2 rounded-lg p-4 shadow-sm min-[480px]:w-[320px] min-[600px]:w-[356px]"
    >
      <p className="text-background mr-4 text-sm">{message}</p>
      <button
        type="button"
        onClick={() => toast.dismiss(id)}
        className="text-background hover:bg-background/10 absolute top-0 right-0 flex size-8 items-center justify-center rounded-full opacity-60 transition duration-200 ease-in-out hover:opacity-90"
      >
        <FiX className="size-4" />
      </button>
    </div>
  ));
}
