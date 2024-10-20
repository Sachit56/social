"use client";

import { useEffect, useState } from "react";
import supabase from "@/utils/supabase";
import { Button } from "@/components/ui/button";
import LandingPage from "@/pages/LandingPage";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { User } from "@/utils/interface";

export default function Auth() {
  const [user, setUser] = useState<User | null>(null); 
  const { toast } = useToast();
  const navigate = useNavigate();

  const githubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    if (!error) {
      toast({
        description: "Logged in with GitHub!",
      });
    }
  };

  const googleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (!error) {
      toast({
        description: "Logged in with Google!",
      });
    }
  };

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user || null); 
    };

    fetchSession();
  }, []);

  return (
    <div className="flex flex-col justify-between items-center gap-5 mt-10">
      {user ? (
        <LandingPage />
      ) : (
        <>
          <Button onClick={githubLogin}>Login with GitHub</Button>
          <Button onClick={googleLogin}>Login with Google</Button>
          <Button onClick={() => navigate("/docs")}>Docs</Button>
        </>
      )}
    </div>
  );
}
