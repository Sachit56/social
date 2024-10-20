"use client";

import { useEffect, useState } from "react";
import supabase from "@/utils/supabase";
import { Button } from "@/components/ui/button";
import LandingPage from "@/pages/LandingPage";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [user, setUser] = useState<unknown | null>(null); 
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
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-md w-full p-6 shadow-lg rounded-lg">
        {user ? (
          <LandingPage />
        ) : (
          <div className="flex flex-col gap-4">
            <Button onClick={githubLogin} className="w-full bg-gray-800 text-white hover:bg-gray-700">
              Login with GitHub
            </Button>
            <Button onClick={googleLogin} className="w-full bg-blue-500 text-white hover:bg-blue-400">
              Login with Google
            </Button>
            <Button onClick={() => navigate("/docs")} className="w-full bg-green-500 text-white hover:bg-green-400">
              Docs
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
