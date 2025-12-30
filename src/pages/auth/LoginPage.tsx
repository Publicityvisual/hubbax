import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SplitAuthLayout } from '../../layouts/SplitAuthLayout';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Mail, Lock, ArrowRight, Github } from 'lucide-react';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <SplitAuthLayout 
      title="Welcome Back" 
      subtitle="Enter your credentials to access your account."
      image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
    >
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div className="space-y-4">
             <Button type="button" variant="outline" className="w-full relative py-6" size="lg">
                <Github className="w-5 h-5 absolute left-4" />
                Continue with Github
             </Button>
             <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#050505] px-2 text-white/30">Or continue with email</span>
                </div>
             </div>
        </div>

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
        
        <div className="flex justify-between items-center text-sm">
          <label className="flex items-center space-x-2 cursor-pointer group">
             <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 checked:bg-primary transition-colors cursor-pointer" />
             <span className="text-white/40 group-hover:text-white/60 transition-colors">Remember me</span>
          </label>
          <Link 
            to="/forgot-password" 
            className="text-primary hover:text-primary/80 transition-colors font-medium"
          >
            Forgot Password?
          </Link>
        </div>

        <Button type="submit" className="w-full py-6 text-lg" size="lg" isLoading={isLoading}>
          Sign In
          {!isLoading && <ArrowRight className="w-5 h-5 ml-2" />}
        </Button>

        <p className="text-center text-sm text-white/40 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary hover:text-primary/80 font-medium transition-colors">
            Sign up for free
          </Link>
        </p>
      </form>
    </SplitAuthLayout>
  );
}
