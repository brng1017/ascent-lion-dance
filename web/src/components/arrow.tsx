import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';

export function Arrow({
  diagonal = false,
  className = 'size-4',
}: {
  diagonal?: boolean;
  className?: string;
}) {
  const Icon = diagonal ? FiArrowUpRight : FiArrowRight;
  return <Icon aria-hidden='true' focusable='false' strokeWidth={1.5} className={`shrink-0 ${className}`} />;
}
