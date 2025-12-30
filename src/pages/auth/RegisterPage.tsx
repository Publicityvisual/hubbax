import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SplitAuthLayout } from '../../layouts/SplitAuthLayout';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Mail, Lock, User, ArrowRight, Github, Calendar, Users } from 'lucide-react';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate reg
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <SplitAuthLayout 
      title="Create Account" 
      subtitle="Join the exclusive network today."
      image="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2664&auto=format&fit=crop"
    >
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
         <div className="space-y-4">
             <Button type="button" variant="outline" className="w-full relative py-6" size="lg">
                <Github className="w-5 h-5 absolute left-4" />
                Sign up with Github
             </Button>
             <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#050505] px-2 text-white/30">Or sign up with email</span>
                </div>
             </div>
        </div>

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
        
        <div className="grid grid-cols-2 gap-4">
             <Input 
                label="Date of Birth" 
                type="date" 
                icon={<Calendar className="w-4 h-4" />}
                required
                className="[&::-webkit-calendar-picker-indicator]:invert"
            />
             <div className="relative w-full group">
                 <select className="w-full h-[52px] rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm text-sm text-white px-4 pl-10 focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none appearance-none transition-all cursor-pointer">
                    <option value="" disabled selected>Gender</option>
                    <option value="male" className="bg-black">Male</option>
                    <option value="female" className="bg-black">Female</option>
                    <option value="other" className="bg-black">Other</option>
                 </select>
                 <Users className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
             </div>
        </div>

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
        
        <div className="text-xs text-center text-white/40 leading-relaxed px-4">
            By clicking "Create Account", you agree to our <span className="text-primary cursor-pointer hover:underline">Terms of Service</span> and <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span>.
        </div>

        <Button type="submit" className="w-full py-6 text-lg" size="lg" isLoading={isLoading}>
          Create Account
          {!isLoading && <ArrowRight className="w-5 h-5 ml-2" />}
        </Button>

        <p className="text-center text-sm text-white/40 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </form>
    </SplitAuthLayout>
  );
}
