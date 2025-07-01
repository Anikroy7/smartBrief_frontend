import { Link } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';

const NotFoundPage = () => {
    return (
        <MainLayout>
            <div className="min-h-screen flex flex-col justify-center items-center bg-base-200 text-center px-4">
                <h1 className="text-6xl font-bold text-error mb-4">404</h1>
                <p className="text-xl mb-6 text-base-content">Oops! The page you're looking for doesn't exist.</p>
                <Link to="/" className="btn btn-primary">
                    Go back home
                </Link>
            </div>
        </MainLayout>
    );
};

export default NotFoundPage;
