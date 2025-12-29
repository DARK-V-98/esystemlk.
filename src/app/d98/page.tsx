
"use client";

import { useState } from 'react';
import BootSequence from '@/components/d98/BootSequence';
import Dashboard from '@/components/d98/Dashboard';

const D98Page = () => {
  const [isBooted, setIsBooted] = useState(false);

  return (
    <div className="w-full h-screen overflow-hidden bg-background">
      {!isBooted && <BootSequence onComplete={() => setIsBooted(true)} />}
      {isBooted && <Dashboard />}
    </div>
  );
};

export default D98Page;
