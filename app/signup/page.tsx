"use client"
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client'; // Adjust the import path as necessary


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
)

export interface UserProfile {
  userid: string;
  name: string;
  birth: string; // ISO date string
  who: 'owner' | 'kid';
  number: string;
  address: string;
  education: 'student' | 'university' | 'working' | 'unemployed' | 'other';
  experience: 'Beginner' | 'Intermediate' | 'Advanced' | 'Parent';
  intrested: boolean;
}

const defaultProfile: Omit<UserProfile, 'userid'> = {
  name: '',
  birth: '',
  who: 'kid',
  number: '',
  address: '',
  education: 'student',
  experience: 'Beginner',
  intrested: false,
};

export default function SignUpWithProfileForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState<Omit<UserProfile, 'userid'>>(defaultProfile);
  const [loading, setLoading] = useState(false);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      alert('Signup error: ' + error.message);
      setLoading(false);
      return;
    }

    const userid = data.user?.id;
    if (!userid) {
      alert('No user returned after signup');
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase
      .from('user_profiles')
      .insert({ ...profile, userid });

    if (insertError) {
      alert('Profile creation error: ' + insertError.message);
    } else {
      alert('Signup complete! YOu can visit your profile now.');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4 max-w-xl mx-auto p-4">
      <input type="email" placeholder="Email" className="w-full p-2 border rounded" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" className="w-full p-2 border rounded" value={password} onChange={e => setPassword(e.target.value)} />

      <input type="text" name="name" placeholder="Full Name" value={profile.name} onChange={handleProfileChange} className="w-full p-2 border rounded" />
      <input type="date" name="birth" value={profile.birth} onChange={handleProfileChange} className="w-full p-2 border rounded" />

      <select name="this account is made for Me (Owner) or my Child?" value={profile.who} onChange={handleProfileChange} className="w-full p-2 border rounded">
        <option value="owner">Owner</option>
        <option value="kid">Kid</option>
      </select>

      <input type="text" name="number" placeholder="Phone" value={profile.number} onChange={handleProfileChange} className="w-full p-2 border rounded" />
      <input type="text" name="address" placeholder="Address" value={profile.address} onChange={handleProfileChange} className="w-full p-2 border rounded" />

      <select name="education" value={profile.education} onChange={handleProfileChange} className="w-full p-2 border rounded">
        <option value="student">Student</option>
        <option value="university">University</option>
        <option value="working">Working</option>
        <option value="unemployed">Unemployed</option>
        <option value="other">Other</option>
      </select>

      <select name="experience" value={profile.experience} onChange={handleProfileChange} className="w-full p-2 border rounded">
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>

      <label className="flex gap-2 items-center">
        <input type="checkbox" name="intrested" checked={profile.intrested} onChange={handleProfileChange} />
        Interested in helping the Team behind the Club?
      </label>

      <button type="submit" disabled={loading} className="bg-green-500 text-white px-4 py-2 rounded">
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
  );
}
