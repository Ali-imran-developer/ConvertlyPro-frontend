import CommonForm from "@/view/common/form";
import { useToast } from "@/hooks/use-toast";
import { registerFormControls } from "../../data/authData/authData";
import {registerUser} from "../../store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import DividerWithText from "../../components/shared/dividerText";
import GoogleIcon from "../../../public/assets/logo/google-logo.png";
import { UserRoundPlus } from "lucide-react";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/login");
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
      <div className="mx-auto w-full max-w-md space-y-6 bg-white px-6 py-6 rounded-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#000027] flex items-center justify-center gap-3">
            <UserRoundPlus className="w-8 h-auto object-cover text-[#000027]"/>
            Create new account
          </h1>
          <p className="mt-2">
            Already have an account
            <Link
              className="font-medium ml-2 text-[#000027] hover:underline"
              to="/login"
            >
              Login
            </Link>
          </p>
        </div>
        <CommonForm
          formControls={registerFormControls}
          buttonText={"Sign Up"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
        <DividerWithText text="OR"/>
        <button className="flex items-center justify-center gap-2 w-full bg-gray-200 py-2 
        rounded-lg hover:bg-gray-300 text-base font-semibold">
          <img src={GoogleIcon} alt="" className="w-5 h-auto object-cover"/>
          Continue with Google
        </button>
      </div>
    </section>
  );
}

export default AuthRegister;
