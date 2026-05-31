// File: src/pages/ProfilePage.tsx
// Place this file in src/pages/

import { Camera, Mail, User } from "lucide-react";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { Avatar } from "@/components/shared/Avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ProfilePage() {
  return (
    <PageWrapper>
      <div className="mx-auto max-w-4xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Profile
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage your account and preferences.
          </p>
        </div>

        <Card>
          <CardContent className="p-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              <div className="flex flex-col items-center">
                <Avatar
                  name="Sumedh Akula"
                  size="xl"
                  isOnline
                />

                <Button
                  variant="outline"
                  className="mt-4 gap-2"
                >
                  <Camera className="h-4 w-4" />
                  Upload Avatar
                </Button>
              </div>

              <div className="flex-1 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Full Name
                  </label>

                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                    <Input
                      defaultValue="Sumedh Akula"
                      className="pl-9"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Email
                  </label>

                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                    <Input
                      defaultValue="sumedh@example.com"
                      className="pl-9"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Job Title
                  </label>

                  <Input defaultValue="Frontend Tech Lead" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Organization
                  </label>

                  <Input defaultValue="IntellMeet" />
                </div>

                <Button>
                  Save Changes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
}