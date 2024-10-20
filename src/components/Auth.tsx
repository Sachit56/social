"use client";

import { useEffect, useState } from "react";
import supabase from "@/utils/supabase";
import { Button } from "@/components/ui/button";
import LandingPage from "@/pages/LandingPage";
import { useToast } from "@/hooks/use-toast";

export default function Auth() {
  const [user, setUser] = useState<unknown | null>(null); 
  const [docs,setdocs] = useState(false);

  const { toast } = useToast();
  
  const showDocs = () => {
    setdocs(prev => !prev)
}

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
          <Button onClick={showDocs}>Docs</Button>

          {docs && (
            <div className="docs-content mt-5 p-4 border rounded-lg">
              <h2>Documentation</h2>
            </div>
          )}
        </>
      )}
    </div>
  );
}
