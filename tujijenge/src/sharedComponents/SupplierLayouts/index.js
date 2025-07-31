import { Outlet } from 'react-router-dom';
import TaimbaSidebar from '../TaimbaSidebar';

export default function SupplierLayout() {
    return (
        <div className="supplier-layout">
            <TaimbaSidebar />
            <div className="supplier-content">
                <Outlet />
            </div>
        </div>
    );
}