import React from 'react';

interface jobFullProps {
  desc: string | undefined;
}

function JobDescription({ desc }: jobFullProps) {
  return (
    <div className="w-full mt-5 h-full ">
      <h1 className="font-bold text-2xl mb-5">Project Description</h1>
         <p className='text-lg'>{desc}</p> 
    </div>
  );
}

export default JobDescription;
