'use client';

import { ProtectedRoute } from '../ProtectedRoute';
import { DashboardMenu } from '@ocmi/frontend/ui/components/Menu';

export default function Timesheets() {
  return (
    <ProtectedRoute>
      <DashboardMenu>
        <h2>Buenas desde timesheets</h2>
      </DashboardMenu>
    </ProtectedRoute>
  );
}
