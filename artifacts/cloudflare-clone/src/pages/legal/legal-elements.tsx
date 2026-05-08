import React from 'react';

export function LP({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-[16px] leading-[1.8] text-[#374151] last:mb-0">{children}</p>;
}

export function LStrong({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-[#374151]">{children}</strong>;
}

export function SecH2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mt-12 mb-4 scroll-mt-28 text-[22px] font-semibold text-[#0B1320] first:mt-0">
      {children}
    </h2>
  );
}

export function DashLi({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2 text-[16px] leading-[1.8] text-[#374151]">
      <span className="shrink-0 select-none">—</span>
      <span className="min-w-0">{children}</span>
    </li>
  );
}

export function DashUl({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mb-6 list-none space-y-2 pl-0" role="list">
      {items.map((it, i) => (
        <DashLi key={i}>{it}</DashLi>
      ))}
    </ul>
  );
}
