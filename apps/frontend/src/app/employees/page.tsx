'use client';

import { ProtectedRoute } from '../ProtectedRoute';
import { DashboardMenu } from '@ocmi/frontend/ui/components/Menu';

export default function Employees() {
  return (
    <ProtectedRoute>
      <DashboardMenu>
        <h2>Buenasas</h2>
      </DashboardMenu>
    </ProtectedRoute>
  );
}
