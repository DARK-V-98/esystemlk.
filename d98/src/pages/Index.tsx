import { useState } from 'react';
import BootSequence from '@/components/BootSequence';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const [isBooted, setIsBooted] = useState(false);

  return (
    <div className="w-full h-screen overflow-hidden bg-background">
      {!isBooted && <BootSequence onComplete={() => setIsBooted(true)} />}
      {isBooted && <Dashboard />}
    </div>
  );
};

export default Index;
