import Link from "next/link";
import { logoutAction } from "@/lib/admin-actions";

export default function AdminTopbar() {
  return (
    <header className="admin-topbar">
      <Link href="/admin" className="admin-topbar-brand">
        RYAN <span>PRISCO</span> ADMIN
      </Link>
      <div className="admin-topbar-right">
        <Link href="/" target="_blank" rel="noopener">
          View Site ↗
        </Link>
        <Link href="/blog" target="_blank" rel="noopener">
          View Blog ↗
        </Link>
        <form action={logoutAction}>
          <button type="submit" className="admin-logout">
            Sign out
          </button>
        </form>
      </div>
    </header>
  );
}
