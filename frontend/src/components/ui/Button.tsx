import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' };

export default function Button({ variant = 'primary', children, ...rest }: Props) {
  const base = 'py-2 px-4 rounded font-medium';
  const cls = variant === 'primary' ? `${base} bg-orange-600 text-white` : `${base} bg-gray-100`;
  return <button className={cls} {...rest}>{children}</button>;
}