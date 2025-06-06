'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import {
  LogOut,
  Trash2,
  PencilLine,
  Save,
  Loader2,
  Calendar,
  User,
  Phone,
  MapPin,
  GraduationCap,
  BadgeCheck,
  Heart,
} from 'lucide-react';

export interface UserProfile {
  userid: string;
  name: string;
  birth: string;
  who: 'owner' | 'kid';
  number: string;
  address: string;
  education: 'student' | 'university' | 'working' | 'unemployed' | 'other';
  experience: 'Beginner' | 'Intermediate' | 'Advanced' | 'Parent';
  intrested: boolean;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
);

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('userid', user.id)
        .single();

      if (data) setProfile(data);
      if (error) alert(error.message);
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (!profile) return;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setProfile({ ...profile, [name]: checked });
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const updateProfile = async () => {
    setUpdating(true);
    const { error } = await supabase
      .from('user_profiles')
      .update(profile!)
      .eq('userid', profile!.userid);

    if (error) alert(error.message);
    else setEditing(false);
    setUpdating(false);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const deleteAccount = async () => {
    if (!confirm("Are you sure you want to permanently delete your account?")) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from('user_profiles').delete().eq('userid', user.id);

    alert("Deleted profile. You'll be logged out.");
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
      </div>
    );
  }

  if (!profile) return <p className="text-center mt-10">No profile found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Profile</h1>
        <div className="flex gap-2">
          {editing ? (
            <button onClick={updateProfile} disabled={updating} className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700">
              {updating ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
            </button>
          ) : (
            <button onClick={() => setEditing(true)} className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600">
              <PencilLine className="w-4 h-4" />
            </button>
          )}
          <button onClick={logout} className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600">
            <LogOut className="w-4 h-4" />
          </button>
          <button onClick={deleteAccount} className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {renderField("name", "Full Name", profile.name, editing, handleInput, <User />)}
        {renderField("birth", "Birth Date", profile.birth, editing, handleInput, <Calendar />, "date")}
        {renderSelect("who", "Who", profile.who, ['owner', 'kid'], editing, handleInput)}
        {renderField("number", "Phone", profile.number, editing, handleInput, <Phone />)}
        {renderField("address", "Address", profile.address, editing, handleInput, <MapPin />)}
        {renderSelect("education", "Education", profile.education, ['student', 'university', 'working', 'unemployed', 'other'], editing, handleInput, <GraduationCap />)}
        {renderSelect("experience", "Experience", profile.experience, ['Beginner', 'Intermediate', 'Advanced', 'Parent'], editing, handleInput, <BadgeCheck />)}
        {renderCheckbox("intrested", "Interested in the program?", profile.intrested, editing, handleInput, <Heart />)}
      </div>
    </div>
  );
}

// ========== 🔧 UI RENDER HELPERS ==========

function renderField(
  name: string,
  label: string,
  value: string,
  editable: boolean,
  onChange: any,
  icon?: React.ReactNode,
  type: string = 'text'
) {
  return (
    <label className="flex flex-col gap-1">
      <span className="flex items-center gap-2 text-sm text-gray-700">{icon} {label}</span>
      <input
        type={type}
        name={name}
        value={value}
        disabled={!editable}
        onChange={onChange}
        className="p-2 border rounded bg-white text-sm disabled:bg-gray-100"
      />
    </label>
  );
}

function renderSelect(
  name: string,
  label: string,
  value: string,
  options: string[],
  editable: boolean,
  onChange: any,
  icon?: React.ReactNode
) {
  return (
    <label className="flex flex-col gap-1">
      <span className="flex items-center gap-2 text-sm text-gray-700">{icon} {label}</span>
      <select
        name={name}
        value={value}
        disabled={!editable}
        onChange={onChange}
        className="p-2 border rounded bg-white text-sm disabled:bg-gray-100"
      >
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </label>
  );
}

function renderCheckbox(
  name: string,
  label: string,
  checked: boolean,
  editable: boolean,
  onChange: any,
  icon?: React.ReactNode
) {
  return (
    <label className="flex items-center gap-2 text-sm text-gray-700">
      {icon}
      <input
        type="checkbox"
        name={name}
        checked={checked}
        disabled={!editable}
        onChange={onChange}
        className="accent-blue-500"
      />
      {label}
    </label>
  );
}
