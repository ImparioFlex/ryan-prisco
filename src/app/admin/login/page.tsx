import { redirect } from "next/navigation";
import { isAuthenticated, verifyPassword, startSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

async function loginAction(formData: FormData) {
  "use server";
  const password = String(formData.get("password") ?? "");
  const result = await verifyPassword(password);
  if (!result.ok) {
    redirect("/admin/login?error=1");
  }
  await startSession(result.token);
  redirect("/admin");
}

type Props = { searchParams: Promise<{ error?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  if (await isAuthenticated()) {
    redirect("/admin");
  }
  const { error } = await searchParams;

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          RYAN <span>PRISCO</span>
        </div>
        <h1 className="login-title">Sign in to Admin</h1>
        <p className="login-sub">
          Enter the password Trevor shared with you.
        </p>

        {error ? (
          <div className="login-error">
            That password didn&rsquo;t match. Give it another try.
          </div>
        ) : null}

        <form action={loginAction} className="login-form">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            autoFocus
            placeholder="••••••••"
          />
          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
}
