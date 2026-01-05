'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Lock, Bell } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("account");
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        toast.success("Profile updated successfully");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-2">Manage your account settings and preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 space-y-2">
            <Button 
                variant={activeTab === "account" ? "secondary" : "ghost"} 
                className="w-full justify-start"
                onClick={() => setActiveTab("account")}
            >
                <User className="mr-2 h-4 w-4" /> Account
            </Button>
            <Button 
                variant={activeTab === "password" ? "secondary" : "ghost"} 
                className="w-full justify-start"
                onClick={() => setActiveTab("password")}
            >
                <Lock className="mr-2 h-4 w-4" /> Password
            </Button>
             <Button 
                variant={activeTab === "notifications" ? "secondary" : "ghost"} 
                className="w-full justify-start"
                onClick={() => setActiveTab("notifications")}
            >
                <Bell className="mr-2 h-4 w-4" /> Notifications
            </Button>
        </aside>

        <div className="flex-1 max-w-2xl">
            {activeTab === "account" && (
                <Card>
                    <CardHeader>
                        <CardTitle>Account Information</CardTitle>
                        <CardDescription>Update your profile details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Display Name</Label>
                            <Input id="name" defaultValue="John Doe" />
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue="john@example.com" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleSave} disabled={loading}>{loading ? "Saving..." : "Save Changes"}</Button>
                    </CardFooter>
                </Card>
            )}

            {activeTab === "password" && (
                <Card>
                    <CardHeader>
                        <CardTitle>Change Password</CardTitle>
                        <CardDescription>Update your password associated with your account.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="current">Current Password</Label>
                            <Input id="current" type="password" />
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="new">New Password</Label>
                            <Input id="new" type="password" />
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="confirm">Confirm Password</Label>
                            <Input id="confirm" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                         <Button onClick={handleSave} disabled={loading}>{loading ? "Updating..." : "Update Password"}</Button>
                    </CardFooter>
                </Card>
            )}

             {activeTab === "notifications" && (
                <Card>
                    <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                        <CardDescription>Manage your notification preferences.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <div className="text-sm text-slate-500">Notification settings coming soon.</div>
                    </CardContent>
                </Card>
            )}
        </div>
      </div>
    </div>
  );
}
