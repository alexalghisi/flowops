import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AUTHOR } from "@/lib/contact";

export default function LandingPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-16">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">Personal portfolio · technical case study</p>
      <h1 className="mt-3 text-4xl font-semibold">FlowOps</h1>
      <p className="mt-4 text-muted-foreground">Multi-tenant operations board: projects, persisted column moves, activity, and CSV export.</p>
      <p className="mt-3 text-sm text-muted-foreground">Ops teams need a board that remembers who moved what — not a screenshot of sticky notes. Seed data is fictional. No customers or revenue are claimed.</p>
      <div className="mt-8 flex gap-2">
        <Button asChild>
          <Link href="/login">Open the demo</Link>
        </Button>
        <Button asChild variant="outline">
          <a href={AUTHOR.github}>GitHub</a>
        </Button>
      </div>
      <section className="mt-12 space-y-2 text-sm">
        <h2 className="font-semibold">Implemented</h2>
        <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
          <li>Email/password session (HttpOnly cookie)</li>
          <li>Organization membership and role (owner / member / viewer)</li>
          <li>Projects and tasks on a four-column board</li>
          <li>Persisted column moves with an activity row</li>
          <li>Viewer cannot move tasks (enforced in the server action)</li>
          <li>CSV export of the open project</li>
          <li>Seeded Harborline Operations desk</li>
        </ul>
      </section>
      <footer className="mt-16 border-t border-border pt-6 text-sm text-muted-foreground">
        {AUTHOR.name} · <a className="underline" href={AUTHOR.linkedin}>{AUTHOR.linkedin.replace("https://www.", "")}</a>
      </footer>
    </main>
  );
}
