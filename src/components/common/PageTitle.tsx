import React from 'react';

import { Heading } from '../framework/typography';

type Props = {
  title: string;
  className?: string;
};

export default function PageTitle({ title, className }: Props) {
  return (
    <Heading as='h6' className={className}>
      {title}
    </Heading>
  );
}
