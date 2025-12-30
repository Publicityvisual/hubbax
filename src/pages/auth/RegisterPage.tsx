import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from '../../layouts/AuthLayout';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate reg
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <AuthLayout subtitle="Create an account strictly for winners.">
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="grid grid-cols-2 gap-4">
            <Input 
                label="First Name" 
                type="text" 
                icon={<User className="w-4 h-4" />}
                required
            />
            <Input 
                label="Last Name" 
                type="text" 
                icon={<User className="w-4 h-4" />}
                required
            />
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
        <Input 
          label="Confirm Password" 
          type="password" 
          icon={<Lock className="w-4 h-4" />}
          required
        />
        
        <Button type="submit" className="w-full mt-4" size="lg" isLoading={isLoading}>
          Create Account
          {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
        </Button>

        <p className="text-center text-xs text-white/40 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
