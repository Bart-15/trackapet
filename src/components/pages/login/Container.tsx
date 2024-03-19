import { Card } from '@/components/ui/card';

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <Card className='w-[500px]'>{children}</Card>;
};

export default Container;
