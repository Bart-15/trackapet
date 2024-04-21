import { Card } from '@/components/ui/card';

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children, ...props }: ContainerProps) => {
  return (
    <Card className='w-[500px]' {...props}>
      {children}
    </Card>
  );
};

export default Container;
