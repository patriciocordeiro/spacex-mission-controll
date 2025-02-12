import React from 'react';

type EmptyContentMessageProps = {
  title: string;
  description: string;
};

const EmptyContentMessage: React.FC<EmptyContentMessageProps> = ({
  title,
  description,
}) => {
  return (
    <div className='flex flex-1 items-center justify-center w-full h-[33vh]'>
      <div className='w-[160px] text-center flex flex-col items-center gap-1'>
        <p className='text-sm font-medium'>{title}</p>
        <span className='text-muted-foreground text-sm font-normal'>
          {description}
        </span>
      </div>
    </div>
  );
};

export default EmptyContentMessage;
