import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center glass-strong rounded-3xl p-10 shadow-elevated">
        <h1 className="text-7xl font-bold gradient-text">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-xl gradient-primary px-5 py-2.5 text-sm font-medium text-white glow-sm"
        >
          Back home
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "OpportunityRadar AI — Never Miss the Right Opportunity Again" },
      {
        name: "description",
        content:
          "AI-powered personalized opportunity discovery and career readiness platform for college students. Find internships, hackathons, and scholarships matched to your profile.",
      },
      { name: "author", content: "OpportunityRadar AI" },
      { property: "og:title", content: "OpportunityRadar AI — Never Miss the Right Opportunity Again" },
      {
        property: "og:description",
        content: "AI career intelligence platform for college students.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "OpportunityRadar AI — Never Miss the Right Opportunity Again" },
      { name: "description", content: "OpportunityRadar AI is an AI-powered career intelligence platform for college students." },
      { property: "og:description", content: "OpportunityRadar AI is an AI-powered career intelligence platform for college students." },
      { name: "twitter:description", content: "OpportunityRadar AI is an AI-powered career intelligence platform for college students." },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: () => <Outlet />,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="dark">
        {children}
        <Scripts />
      </body>
    </html>
  );
}
