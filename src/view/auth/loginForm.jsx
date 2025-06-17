import CommonForm from "@/view/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "../../data/authData/authData";
import { useEffect, useState } from "react";
import { loginUser } from "../../store/auth-slice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "../../../public/assets/logo/google-logo.png";
import DividerWithText from "../../components/shared/dividerText";
import { LogIn } from "lucide-react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebaseConfig";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/profile");
    }
  }, []);

  const handleGoogleLogin = async () => {
    try {
      googleProvider.setCustomParameters({
        prompt: "select_account",
      });
  
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userName = user.displayName || user.email;
      const token = await user.getIdToken();
      
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify({ ...user, userName }));
      toast({
        title: "Login Successful",
        description: `Welcome, ${userName}`,
      });
      navigate("/profile");
    } catch (error) {
      console.error("Google Login Error:", error.message);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };
   

  // const handleLogout = async () => {
  //   try {
  //     await signOut(auth); // Firebase logout
  //     localStorage.removeItem("authToken");
  //     localStorage.removeItem("user");
  //     toast({ title: "Logged out successfully." });
  //     navigate("/login");
  //   } catch (error) {
  //     console.error("Logout Error:", error.message);
  //     toast({
  //       title: "Error",
  //       description: error.message,
  //       variant: "destructive",
  //     });
  //   }
  // };

  function onSubmit(event) {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });

        localStorage.setItem("authToken", data.payload.user.id);
        localStorage.setItem("user", JSON.stringify(data.payload.user));

        const token = localStorage.getItem("authToken");
        if (token) {
          navigate("/profile");
        }
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <section className="bg-gray-100 py-10">
      <div className="mx-auto w-full max-w-md space-y-6 px-6 py-6 bg-white rounded-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#000027] flex items-center justify-center gap-3">
            <LogIn className="w-8 h-auto object-cover text-[#000027]" />
            Sign in to your account
          </h1>
          <p className="mt-2">
            Don't have an account
            <Link
              className="font-medium ml-2 text-[#000027] hover:underline"
              to="/register"
            >
              Register
            </Link>
          </p>
        </div>
        <CommonForm
          formControls={loginFormControls}
          buttonText={"Sign In"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
        <DividerWithText text="OR" />
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-2 w-full bg-gray-200 py-2 rounded-lg hover:bg-gray-300 text-base font-semibold"
        >
          <img src={GoogleIcon} alt="" className="w-5 h-auto object-cover" />
          Continue with Google
        </button>
      </div>
    </section>
  );
}

export default AuthLogin;