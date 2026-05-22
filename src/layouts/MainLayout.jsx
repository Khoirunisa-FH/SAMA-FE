import { useState } from 'react';

import { Outlet } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function MainLayout() {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  return (
    <div className="bg-slate-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content */}
      <div
        className="
          xl:ml-72
          min-h-screen
          flex flex-col
        "
      >
        {/* Header */}
        <Header
          setMobileOpen={setMobileOpen}
        />

        {/* Content */}
        <main
          className="
            flex-1
            p-4
            lg:p-8
            overflow-x-hidden
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}