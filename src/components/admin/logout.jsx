'use client'
import { FiLogOut } from "react-icons/fi";

const LogoutButton = () => {
  const handleSignOut = async () => {
    await authClient.signOut();
    redirect("/");
  };

  return (
    <div>
      <button
        onClick={handleSignOut}
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors cursor-pointer text-left"
      >
        <FiLogOut className="w-4 h-4" />
        Log out
      </button>
    </div>
  );
};

export default LogoutButton;
