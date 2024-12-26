import * as React from 'react';
import Link from 'next/link';
import { AnimationDefinition, motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  className?: string;
  href?: string;
  onAnimationStart?: (definition: AnimationDefinition) => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, href, onAnimationStart, style, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn('rounded-lg bg-card text-card-foreground shadow-sm', className)}
      onAnimationStart={onAnimationStart}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={style}
      {...props}
    >
      {href ? (
        <Link href={href} className="block h-full w-full">
          <div className="h-full w-full">{props.children}</div>
        </Link>
      ) : (
        <div className="h-full w-full">{props.children}</div>
      )}
    </motion.div>
  ),
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  ),
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  ),
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  ),
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  ),
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
