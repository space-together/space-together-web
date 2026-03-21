"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FadeIn } from "../_components/motion";
import { useState } from "react";

export function EnterpriseContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <FadeIn delay={0.08}>
      <Card className="border-base-300 border">
        <CardHeader>
          <CardTitle>Contact sales</CardTitle>
          <CardDescription>
            Tell us about your schools, regions, and integration needs. We will
            follow up with next steps.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div className="grid gap-2">
              <Label htmlFor="ent-name">Name</Label>
              <Input id="ent-name" name="name" required autoComplete="name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ent-email">Work email</Label>
              <Input
                id="ent-email"
                name="email"
                type="email"
                required
                autoComplete="email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ent-org">Organization</Label>
              <Input id="ent-org" name="organization" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ent-notes">What should we know?</Label>
              <Textarea id="ent-notes" name="notes" rows={4} />
            </div>
            <Button type="submit" library="daisy" variant="primary">
              {sent ? "Thanks — we will be in touch" : "Request contact"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </FadeIn>
  );
}
