// app/account/page.tsx

"use client";

import { useContext, useState, useEffect } from "react";
import { ChatbotUIContext } from "@/context/context";
import { supabase } from "@/lib/supabase/browser-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function AccountPage() {
  const { user, setUser } = useContext(ChatbotUIContext);
  const router = useRouter();
  const [fullName, setFullName] = useState(user?.user_metadata.full_name || "");

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
  }, [user, router]);

  const handleUpdateProfile = async () => {
    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName },
    });

    if (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } else {
      // Atualizar o contexto do usuário
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      toast.success("Profile updated");
    }
  };

  if (!user) {
    return null; // Ou um indicador de carregamento
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Account</h1>
      <div className="space-y-4">
        <div>
          <Label>Name</Label>
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <Button onClick={handleUpdateProfile}>Update Profile</Button>
      </div>
    </div>
  );
}
