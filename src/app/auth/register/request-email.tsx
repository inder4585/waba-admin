'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { emailVerify } from '@/api/auth.api';

export default function RequestEmail() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      console.log('update');
      await emailVerify(email);
      toast.success('Verification email sent');
      sessionStorage.setItem('email', email);
      router.push(`/auth/verify?email=${email}`);
    } catch (err: any) {
      toast.error(err.message);
      sessionStorage.setItem('email', '');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto text-center mt-10">
      <h2 className="text-xl font-semibold mb-4">Enter your Email</h2>
      <Input
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4"
      />
      <Button
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send Verification'}
      </Button>
    </div>
  );
}
