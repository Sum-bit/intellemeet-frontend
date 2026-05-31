// File: src/pages/AuthPage.tsx
// Place this file in src/pages/

import { useState } from "react";
import { ArrowRight, Lock, Mail, User, Video } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LoginFormState {
  email: string;
  password: string;
}

interface RegisterFormState {
  name: string;
  email: string;
  password: string;
}

export default function AuthPage() {
  const auth = useAuth();

  const [loginForm, setLoginForm] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  const [registerForm, setRegisterForm] =
    useState<RegisterFormState>({
      name: "",
      email: "",
      password: "",
    });

  const handleLogin = async () => {
    const loginFn = (
      auth as unknown as {
        login?: (email: string, password: string) => Promise<void>;
      }
    ).login;

    if (loginFn) {
      await loginFn(
        loginForm.email,
        loginForm.password
      );
    }
  };

  const handleRegister = async () => {
    const registerFn = (
      auth as unknown as {
        register?: (
          name: string,
          email: string,
          password: string
        ) => Promise<void>;
      }
    ).register;

    if (registerFn) {
      await registerFn(
        registerForm.name,
        registerForm.email,
        registerForm.password
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden flex-1 border-r border-border lg:flex">
        <div className="flex w-full flex-col justify-between p-10">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Video className="h-6 w-6" />
            </div>

            <div>
              <h1 className="text-xl font-semibold">
                IntellMeet
              </h1>

              <p className="text-sm text-muted-foreground">
                Enterprise Collaboration Platform
              </p>
            </div>
          </div>

          <div className="max-w-xl">
            <h2 className="mb-6 text-5xl font-bold leading-tight">
              AI-Powered Meetings For Modern Teams
            </h2>

            <p className="text-lg leading-8 text-muted-foreground">
              Real-time meetings, AI summaries,
              collaborative workspaces, action item
              tracking, analytics and enterprise-grade
              productivity tools in one platform.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              "AI Summaries",
              "Video Meetings",
              "Analytics",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-border bg-card p-4 text-center"
              >
                <p className="text-sm font-medium">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-center p-6 lg:max-w-xl">
        <Card className="w-full max-w-md border-border">
          <CardContent className="p-6">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-semibold">
                Welcome Back
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Access your meetings and workspace
              </p>
            </div>

            <Tabs
              defaultValue="login"
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">
                  Login
                </TabsTrigger>

                <TabsTrigger value="register">
                  Register
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="login"
                className="mt-6 space-y-4"
              >
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                  <Input
                    placeholder="Email"
                    className="pl-9"
                    value={loginForm.email}
                    onChange={(event) =>
                      setLoginForm((prev) => ({
                        ...prev,
                        email: event.target.value,
                      }))
                    }
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                  <Input
                    type="password"
                    placeholder="Password"
                    className="pl-9"
                    value={loginForm.password}
                    onChange={(event) =>
                      setLoginForm((prev) => ({
                        ...prev,
                        password: event.target.value,
                      }))
                    }
                  />
                </div>

                <Button
                  className="w-full gap-2"
                  onClick={handleLogin}
                >
                  Login
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </TabsContent>

              <TabsContent
                value="register"
                className="mt-6 space-y-4"
              >
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                  <Input
                    placeholder="Full Name"
                    className="pl-9"
                    value={registerForm.name}
                    onChange={(event) =>
                      setRegisterForm((prev) => ({
                        ...prev,
                        name: event.target.value,
                      }))
                    }
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                  <Input
                    placeholder="Email"
                    className="pl-9"
                    value={registerForm.email}
                    onChange={(event) =>
                      setRegisterForm((prev) => ({
                        ...prev,
                        email: event.target.value,
                      }))
                    }
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                  <Input
                    type="password"
                    placeholder="Password"
                    className="pl-9"
                    value={registerForm.password}
                    onChange={(event) =>
                      setRegisterForm((prev) => ({
                        ...prev,
                        password: event.target.value,
                      }))
                    }
                  />
                </div>

                <Button
                  className={cn("w-full gap-2")}
                  onClick={handleRegister}
                >
                  Create Account
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}