"use client"
import { Button } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import { redirect } from "next/navigation";
import { useEffect } from "react";


export default function Home() {
  useEffect(()=>{
    redirect('/api/auth/login?post_login_redirect_url=/Dashboard')
  },[])

  return (
    <div>
      
    </div>
  );
}
