import { SignedIn, SignedOut, SignIn, UserButton, useUser } from "@clerk/clerk-react";
import { BriefcaseBusinessIcon, Heart, PenBox } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";

function Header() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [searchParam, setSearchParam] = useSearchParams();
  const user = useUser();
  const handelOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearchParam({});
    }
  };
  useEffect(() => {
    if (searchParam.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [searchParam]);
  return (
    <>
      <nav className="py-4 flex justify-between imtems-center">
        <Link>
          <img src="/logo.png" alt="logo" className="h-20" />
        </Link>
        <div className="flex items-center gap-8">
          <SignedOut>
            <Button
              variant="outline"
              onClick={() => {
                console.log("clicked");
                setShowSignIn(true);
                console.log(showSignIn);
              }}
            >
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            {user?.user?.unsafeMetadata?.role == 'candidate' ? <div></div> :
              <Link to="/post-job">
              {/* TODO:need to add a condition */}
              <Button variant="destructive" className="rounded-full">
                <PenBox size={20} className="mr-2" />
                Post a job
              </Button>
            </Link>
            }
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusinessIcon size={15} />}
                  href="/my-jobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-job"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50"
          onClick={handelOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
}

export default Header;
