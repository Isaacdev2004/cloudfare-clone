import React from 'react';

export function FieldError({ id, message }: { id?: string; message: string | undefined }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 font-sans text-[13px] text-[#D64545]" aria-live="polite">
      {message}
    </p>
  );
}

export const fieldErrorInputClass = 'border-[#D64545] ring-2 ring-[#D64545]/15 focus:ring-[#D64545]/25';
