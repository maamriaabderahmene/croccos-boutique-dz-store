
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-crocco mb-4">404</h1>
        <p className="text-2xl font-medium text-gray-800 mb-2">Page Not Found</p>
        <p className="text-gray-600 mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild size="lg" className="bg-crocco hover:bg-crocco-dark">
          <Link to="/">
            <Home size={18} className="mr-2" /> Return to Homepage
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
