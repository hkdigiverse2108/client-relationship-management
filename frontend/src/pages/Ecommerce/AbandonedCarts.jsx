import React from 'react';
import PageHeader from '@/components/common/PageHeader/PageHeader';

const AbandonedCarts = () => {
  return (
    <>
      <PageHeader 
        title="Abandoned Carts Recovery" 
        description="Track unfinished checkouts, audit recovery flows, and trigger direct reminders." 
      />
      <div className="card border-0 shadow-sm">
        <div className="card-body p-5 text-center" style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem' }}>
          Coming Soon...
        </div>
      </div>
    </>
  );
};

export default AbandonedCarts;
