"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { createUrl } from "@/repositories/urlRepo";

const formSchema = z.object({
  originalUrl: z.string().url(),
  title: z.string().optional(),
  customLink: z.string().optional(),
});

export type formType = z.infer<typeof formSchema>;

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      originalUrl: "",
      customLink: "",
      title: "",
    },
  });

  async function onSubmit(values: formType) {
    const res = await fetch("/api/url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (res.ok) {
      console.log(res.json());
    }
  }

  return (
    <div className="grid place-items-center gap-4">
      <h2 className="text-3xl font-bold py-12">Create a link</h2>
      <div className="w-1/2 bg-card p-24 rounded-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="originalUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Original Url</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/looooooong-url"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom link (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Create Link</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
