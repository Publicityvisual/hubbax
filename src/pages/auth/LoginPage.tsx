import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from '../../layouts/AuthLayout';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <AuthLayout subtitle="Welcome back, we missed you.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input 
          label="Email Address" 
          type="email" 
          icon={<Mail className="w-4 h-4" />}
          required
        />
        <Input 
          label="Password" 
          type="password" 
          icon={<Lock className="w-4 h-4" />}
          required
        />
        
        <div className="flex justify-end">
          <Link 
            to="/forgot-password" 
            className="text-xs text-white/40 hover:text-white transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
          Sign In
          {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
        </Button>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#050505] px-2 text-white/30">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button type="button" variant="outline" size="sm">
            Google
          </Button>
          <Button type="button" variant="outline" size="sm">
            Github
          </Button>
        </div>

        <p className="text-center text-xs text-white/40 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary hover:text-primary/80 font-medium transition-colors">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
