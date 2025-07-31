
import TaimbaSidebar from '../TaimbaSidebar';
import { Outlet } from 'react-router-dom';

export default function CatalogueLayout() {
    return (
        <div className="dashboard-layout">
            <TaimbaSidebar />
            <div className="dashboard-content">
                <Outlet />
            </div>
        </div>
    );
}

