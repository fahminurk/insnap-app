import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useSignOutAccount } from "@/lib/react-query/userQueries";
import { useEffect } from "react";
import { useUserContext } from "@/context/useUserContext";

const TopBar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess, navigate]);

  return (
    <nav className={`topbar`}>
      <div className="flex-between py-4 px-5">
        <Link to={"/"} className="flex gap-3 items-center">
          <p className="h3-bold italic underline">Insnap</p>
        </Link>
        <div className="flex gap-4">
          <Button
            variant={"ghost"}
            className="shad-button_ghost"
            onClick={() => signOut()}
          >
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profle"
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
