import { cn } from '@/lib/utils';

type THeadingProps = {
  children: React.ReactNode;
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
} & React.HTMLAttributes<HTMLElement>;

export const Heading: React.FC<THeadingProps> = ({
  as: Element,
  children,
  className,
  ...rest
}) => {
  switch (Element) {
    case 'h1':
      return (
        <Element
          className={cn(
            `text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl`,
            className,
          )}
          {...rest}
        >
          {children}
        </Element>
      );
    case 'h2':
      return (
        <Element
          className={cn(
            `text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl`,
            className,
          )}
          {...rest}
        >
          {children}
        </Element>
      );
    case 'h3':
      return (
        <Element
          className={cn(
            `text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl`,
            className,
          )}
          {...rest}
        >
          {children}
        </Element>
      );
    case 'h4':
      return (
        <Element
          className={cn(
            `text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl`,
            className,
          )}
          {...rest}
        >
          {children}
        </Element>
      );
    case 'h5':
      return (
        <Element
          className={cn(
            `text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl`,
            className,
          )}
          {...rest}
        >
          {children}
        </Element>
      );
    case 'h6':
      return (
        <Element
          className={cn(
            `text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl`,
            className,
          )}
          {...rest}
        >
          {children}
        </Element>
      );
    default:
      return '';
  }
};

type TTextProps = {
  children: React.ReactNode;
  as: 'p' | 'pre' | 'a' | 'span' | 'small';
  href?: string;
} & React.HTMLAttributes<HTMLElement>;

export const Text: React.FC<TTextProps> = ({
  as: Element,
  children,
  className,
  ...rest
}) => {
  switch (Element) {
    case 'p':
      return (
        <p
          className={cn(
            'sm:text-md lg:text-1xl xl:text-1xl text-base md:text-lg',
            className,
          )}
          {...rest}
        >
          {children}
        </p>
      );
    case 'pre':
      return (
        <pre
          className={cn(
            'text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl',
            className,
          )}
          {...rest}
        >
          {children}
        </pre>
      );
    case 'a':
      return (
        <a
          className={cn('lg:text-md text-base  sm:text-sm', className)}
          {...rest}
        >
          {children}
        </a>
      );
    case 'span':
      return (
        <span className={cn('text-md', className)} {...rest}>
          {children}
        </span>
      );
    case 'small':
      return (
        <small className={cn('text-xs', className)} {...rest}>
          {children}
        </small>
      );
    default:
      return '';
  }
};
