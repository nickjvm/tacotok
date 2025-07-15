"use server";

export type GithubIssueResponse = {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    type: "User";
    site_admin: false;
  };
  labels: [
    {
      id: number;
      node_id: string;
      url: string;
      name: string;
      color: string;
      default: boolean;
      description: "Something isn't working";
    }
  ];
  state: "open";
  locked: boolean;
  assignee: null;
  assignees: [];
  milestone: null;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  author_association: string;
  body: string;
};

export async function createGitHubIssue(
  title: string,
  body: string
): Promise<GithubIssueResponse> {
  const response = await fetch(
    `https://api.github.com/repos/nickjvm/tacotok/issues`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
        labels: ["app request", "automated"],
      }),
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(`GitHub error: ${data.message}`);
  }

  return data;
}
