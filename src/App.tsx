import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FleetProvider } from './context/FleetContext';
import { LandingPage } from './pages/LandingPage';
import { DriverInterface } from './pages/driver/DriverInterface';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { DriverNavbar } from './components/DriverNavbar';
import { AdminSidebar } from './components/AdminSidebar';

function AppContent() {
    const { user, loading } = useAuth();

    // State to track which sub-page is active for drivers and admins
    const [driverPage, setDriverPage] = useState<'dashboard' | 'logs' | 'checklist'>('dashboard');
    const [adminPage, setAdminPage] = useState<'dashboard' | 'maintenance' | 'analytics'>('dashboard');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (user?.email) {
            // Updated logic to recognize an admin by the email string
            setIsAdmin(user.email.includes('admin'));
        }
    }, [user]);

    // Show a loading screen while Firebase verifies the user's session
    if (loading) {
        return (
            <div className="min-h-screen bg-dark-bg flex items-center justify-center">
                <div className="text-white text-lg animate-pulse font-semibold">
                    Initializing FleetFlow...
                </div>
            </div>
        );
    }

    // Redirect to Landing Page if no user is signed in
    if (!user) {
        return <LandingPage />;
    }

    // Render the Admin Portal if the user meets admin criteria
    if (isAdmin) {
        return (
            <div className="flex">
                <AdminSidebar
                    activePage={adminPage}
                    onPageChange={setAdminPage}
                />
                <div className="flex-1 ml-64">
                    {/* Pass activePage to handle conditional rendering of admin sections */}
                    <AdminDashboard activePage={adminPage} />
                </div>
            </div>
        );
    }

    // Default view for Drivers
    return (
        <div className="min-h-screen bg-dark-bg">
            <DriverInterface activePage={driverPage} />
            <DriverNavbar
                activePage={driverPage}
                onPageChange={setDriverPage}
            />
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <FleetProvider>
                <AppContent />
            </FleetProvider>
        </AuthProvider>
    );
}

export default App;