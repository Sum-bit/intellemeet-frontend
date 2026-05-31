// File: src/components/meeting/MeetingSidebar.tsx
// Place this file in src/components/meeting/

import { useMemo, useState } from "react";
import {
  CheckSquare,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Send,
} from "lucide-react";

import { cn } from "@/lib/utils";

import type { Message } from "@/types/message.types";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface MeetingSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  messages: Message[];
  sendChatMessage: (message: string) => void;
  startTyping: () => void;
  stopTyping: () => void;
}

interface TaskCard {
  id: string;
  title: string;
  assignee: string;
}

interface TaskColumn {
  id: string;
  title: string;
  tasks: TaskCard[];
}

const TASK_COLUMNS: TaskColumn[] = [
  {
    id: "todo",
    title: "To Do",
    tasks: [
      {
        id: "1",
        title: "Review Q2 roadmap",
        assignee: "SA",
      },
      {
        id: "2",
        title: "Finalize meeting notes",
        assignee: "AK",
      },
    ],
  },
  {
    id: "progress",
    title: "In Progress",
    tasks: [
      {
        id: "3",
        title: "Update analytics dashboard",
        assignee: "RK",
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    tasks: [
      {
        id: "4",
        title: "Prepare stakeholder deck",
        assignee: "MJ",
      },
    ],
  },
];

function MessageBubble({
  message,
}: {
  message: Message;
}) {
  const initials = message.sender.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex gap-3">
      <Avatar className="h-8 w-8">
        <AvatarImage
          src={message.sender.avatar ?? undefined}
        />
        <AvatarFallback>
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <span className="text-sm font-medium">
            {message.sender.name}
          </span>

          <span className="text-xs text-muted-foreground">
            {new Date(
              message.createdAt
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        <div className="rounded-2xl bg-muted px-3 py-2 text-sm">
          {message.message}
        </div>
      </div>
    </div>
  );
}

export function MeetingSidebar({
  open,
  onOpenChange,
  messages,
  sendChatMessage,
  startTyping,
  stopTyping,
}: MeetingSidebarProps) {
  const [messageInput, setMessageInput] =
    useState("");

  const fallbackMessages = useMemo<Message[]>(
    () => [
      {
        id: "demo-1",
        meetingId: "demo",
        sender: {
          id: "1",
          name: "Sarah Chen",
          avatar: null,
        },
        message:
          "Let's finalize the sprint priorities before wrapping up.",
        createdAt: new Date().toISOString(),
      },
      {
        id: "demo-2",
        meetingId: "demo",
        sender: {
          id: "2",
          name: "David Kim",
          avatar: null,
        },
        message:
          "I've updated the product metrics dashboard.",
        createdAt: new Date().toISOString(),
      },
    ],
    []
  );

  const chatMessages =
    messages.length > 0
      ? messages
      : fallbackMessages;

  const handleSendMessage = () => {
    const value = messageInput.trim();

    if (!value) {
      return;
    }

    sendChatMessage(value);
    stopTyping();
    setMessageInput("");
  };

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent
        side="right"
        className="w-full border-l border-border bg-background p-0 sm:max-w-115"
      >
        <div className="flex h-full flex-col">
          <SheetHeader className="border-b border-border px-6 py-4">
            <SheetTitle className="text-left">
              Meeting Workspace
            </SheetTitle>
          </SheetHeader>

          <Tabs
            defaultValue="chat"
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="border-b border-border px-6 py-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="chat"
                  className="gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  Chat
                </TabsTrigger>

                <TabsTrigger
                  value="tasks"
                  className="gap-2"
                >
                  <CheckSquare className="h-4 w-4" />
                  Tasks
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent
              value="chat"
              className="mt-0 flex min-h-0 flex-1 flex-col"
            >
              <ScrollArea className="flex-1 px-6 py-5">
                <div className="space-y-4">
                  {chatMessages.map((message) => (
                    <MessageBubble
                      key={message.id}
                      message={message}
                    />
                  ))}
                </div>
              </ScrollArea>

              <div className="border-t border-border p-4">
                <div className="flex gap-2">
                  <Input
                    value={messageInput}
                    placeholder="Send a message..."
                    onFocus={startTyping}
                    onBlur={stopTyping}
                    onChange={(event) =>
                      setMessageInput(
                        event.target.value
                      )
                    }
                    onKeyDown={(event) => {
                      if (
                        event.key === "Enter"
                      ) {
                        handleSendMessage();
                      }
                    }}
                  />

                  <Button
                    size="icon"
                    onClick={handleSendMessage}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="tasks"
              className="mt-0 flex min-h-0 flex-1 flex-col"
            >
              <ScrollArea className="flex-1 px-6 py-5">
                <div className="space-y-5">
                  {TASK_COLUMNS.map(
                    (column) => (
                      <div
                        key={column.id}
                        className="rounded-2xl border border-border bg-card"
                      >
                        <div className="flex items-center justify-between border-b border-border px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              {column.title}
                            </span>

                            <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                              {
                                column.tasks
                                  .length
                              }
                            </span>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-3 p-3">
                          {column.tasks.map(
                            (task) => (
                              <div
                                key={task.id}
                                className={cn(
                                  "rounded-xl border border-border bg-background p-3 transition-colors",
                                  "hover:border-primary/30 hover:bg-muted/40"
                                )}
                              >
                                <p className="mb-3 text-sm font-medium">
                                  {
                                    task.title
                                  }
                                </p>

                                <div className="flex items-center justify-between">
                                  <div className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                                    {
                                      task.assignee
                                    }
                                  </div>

                                  <CheckSquare className="h-4 w-4 text-muted-foreground" />
                                </div>
                              </div>
                            )
                          )}

                          <Button
                            variant="ghost"
                            className="w-full justify-start gap-2"
                          >
                            <Plus className="h-4 w-4" />
                            Add Task
                          </Button>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}