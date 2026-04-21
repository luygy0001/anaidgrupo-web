import { INTERMEDIATION_DISCLAIMER } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  variant?: 'default' | 'subtle';
}

export default function IntermediationDisclaimer({
  className,
  variant = 'default',
}: Props) {
  return (
    <p
      className={cn(
        'text-sm leading-relaxed',
        variant === 'default'
          ? 'text-muted-foreground bg-muted p-4 rounded-lg border border-border'
          : 'text-muted-foreground',
        className
      )}
    >
      {INTERMEDIATION_DISCLAIMER}
    </p>
  );
}
