"use client";
import { useActionState, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createGitHubIssue, GithubIssueResponse } from "@/actions/github";
import cn from "@/utils/cn";
import { useNotification } from "@/providers/Notifications";

type State = {
  error?: string;
  success?: boolean;
  result?: GithubIssueResponse;
  fields: {
    url: string;
  };
} | null;

export default function Page() {
  const searchParams = useSearchParams();
  const isTakedown = searchParams.get("type") === "takedown";
  const [formState, setFormState] = useState<State>(null);

  const { addNotification } = useNotification();
  const [state, submitAction, isPending] = useActionState(
    async (prevState: State, formData: FormData) => {
      let title;
      let body;
      const url = formData.get("url") as string;

      if (!url) {
        return {
          success: false,
          error: "URL is required",
          fields: {
            url,
          },
        };
      } else if (
        !url.match(/https?:\/\/(?:www\.)?tiktok\.com\/(@[^/]+\/)?video\/\d+/)
      ) {
        return {
          success: false,
          error: "Please enter a valid direct link to a TikTok video.",
          fields: {
            url,
          },
        };
      }

      if (isTakedown) {
        title = "Takedown Request";
        body = `Takedown Request for ${url}`;
      } else {
        title = "Video Review Request";
        body = `Video Review Request for ${url}`;
      }

      const result = await createGitHubIssue(title, body);
      addNotification({
        message: `Your request has been received.`,
        type: "info",
      });
      return {
        success: true,
        result,
        fields: {
          url,
        },
      };
    },
    null
  );

  useEffect(() => {
    if (state) {
      setFormState(state);
    }
  }, [state]);

  useEffect(() => {
    setFormState(null);
  }, [isTakedown]);

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center justify-center text-center space-y-4 grow">
      <h1 className="text-2xl font-bold mb-2">
        {isTakedown ? "Takedown Request" : "Video Review Request"}
      </h1>
      <p>
        {isTakedown
          ? "We're sorry to hear you don't want your video or recipe featured here. Please enter the URL of the video you want taken down and we'll get right on it."
          : "Got a viral taco recipe to share? Give us the link and we'll review it to see if it's a good candidate for a future Taco Tuesday feature."}
      </p>
      <form
        action={submitAction}
        className="flex gap-2 w-full items-start"
        onChange={() => {
          setFormState((prevState) => ({
            ...prevState,
            error: "",
            fields: {
              url: prevState?.fields?.url || "",
            },
          }));
        }}
      >
        <div className="flex flex-col w-full items-start">
          <input
            className={cn(
              "border border-gray-200 rounded px-4 py-2 w-full",
              formState?.error && "border-red-600"
            )}
            type="text"
            name="url"
            placeholder="https://tiktok.com/@username/video"
            defaultValue={formState?.fields.url || ""}
          />
          {formState?.error && !isPending && (
            <p className="text-red-600">{formState.error}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="border border-lime-400 hover:border-lime-400 bg-lime-400 hover:bg-lime-300 text-black px-4 py-2 rounded transition-colors"
        >
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
