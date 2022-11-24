import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/store";
import Loading from "../../components/common/Loading";
import {
  removeToken,
} from "../../features/loginSlice";
import {
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailTokenMutation,
} from "../../services/AuthApi";

function ResetPassword() {
  const [u_email, setU_Email] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [c_password, setC_Password] = useState<string>("");
  const [warning, setWarning] = useState<string>("");
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false);
  const [loading, setIsLoading] = useState<boolean>(true);
  const params = useLocation().search;
  const token = new URLSearchParams(params).get("token");
  const email = new URLSearchParams(params).get("email");
  const [forgetPasswordStatus, forgetPasswordResponse] =
    useForgetPasswordMutation<any>();
  const [resetPasswordStatus, resetPasswordResponse] =
    useResetPasswordMutation<any>();
  const [emailTokenStatus, emailTokenResponse] =
    useVerifyEmailTokenMutation<any>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onResetPassword = () => {
    if (!u_email) {
      setWarning("Please provide email");
    } else {
      let data = {
        email: u_email,
      };
      forgetPasswordStatus(data)
        .unwrap()
        .then((res) => {
          if(res)
          setWarning("We sent you a reset password link to your email");
        })
        .catch((error) => {
          setWarning("");
          console.log(error);
        });
    }
  };
  const onChangePassword = () => {
    if (!password || !c_password) {
      setWarning("Please provide valid data");
    } else if (password !== c_password) {
      setWarning("Password should match with confirm password field");
    } else {
      let data = {
        email,
        token,
        newPassword: password,
        confirmNewPassword: c_password,
      };
      resetPasswordStatus(data)
        .unwrap()
        .then((res) => {
          if (res) {
            setWarning('')
            dispatch(removeToken());
            navigate("/login");
          }
        })
        .catch((error) => {
          setWarning("");
          console.log(error);
        });
    }
  };
  const verifyEmailToken = () => {
    if (token && email) {
      let data = {
        email,
        token,
      };
      emailTokenStatus(data)
        .unwrap()
        .then((res) => {
          setIsLoading(false);
          setIsChangePassword(true);
          setWarning("");
        })
        .catch((error) => {
          if (error.status === 400) {
            console.log(error);
            setIsLoading(false);
            setIsChangePassword(false);
            setWarning("");
          }
        });
    } else {
      setIsLoading(false);
      setIsChangePassword(false);
      setWarning("");
    }
  };
  useEffect(() => {
    verifyEmailToken();
  }, []);
  return (
    <div className="flex justify-center items-center flex-col align-middle w-full">
      {loading ? (
        <Loading message="loading..." />
      ) : (
        <>
          {forgetPasswordResponse.isError && (
            <span className="text-red-500 text-xl">Invalid email</span>
          )}
          {forgetPasswordResponse.isLoading && (
            <span className="text-yellow-500 text-xl">
              <Loading message="Sending Email..." />
            </span>
          )}
          {forgetPasswordResponse.isSuccess && (
            <span className="text-emerald-500 text-xl">Email sent</span>
          )}
          {emailTokenResponse.isSuccess && (
            <span className="text-emerald-500 text-xl">Token Verified</span>
          )}
          {emailTokenResponse.isLoading && (
            <span className="text-yellow-500 text-xl">
              <Loading message="Verifying Token..." />
            </span>
          )}
          {emailTokenResponse.isError && (
            <span className="text-red-500 text-xl">
              {emailTokenResponse.error.data.message}
            </span>
          )}
          {resetPasswordResponse.isSuccess && (
            <span className="text-emerald-500 text-xl">Password Changed</span>
          )}
          {resetPasswordResponse.isLoading && (
            <span className="text-yellow-500 text-xl">
              <Loading message="Verifying Token..." />
            </span>
          )}
          {resetPasswordResponse.isError && (
            <span className="text-red-500 text-xl">
              Error in setting new password
            </span>
          )}
          {warning && <p className="text-red-500 text-md">{warning}</p>}

          {isChangePassword ? (
            <>
              <div className="w-1/2 p-4 rounded-lg shadow-xl mt-6">
                <form>
                  <span className="text-green-500 text-xl">New Password</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      e.preventDefault();
                      setPassword(e.target.value);
                    }}
                    className="w-full px-2 py-2 mt-2 bg-black text-white border-none rounded-md"
                    autoComplete="current-password"
                  />
                  <span className="text-green-500 text-xl">
                    Confirm New Password
                  </span>
                  <input
                    type="password"
                    value={c_password}
                    onChange={(e) => {
                      e.preventDefault();
                      setC_Password(e.target.value);
                    }}
                    className="w-full px-2 py-2 mt-2 bg-black text-white border-none rounded-md"
                    autoComplete="current-password"
                  />
                </form>
              </div>
              <button
                className="px-4 py-2 ml-3 bg-green-300 rounded-lg text-green-800 text-lg font-bold border-none hover:border-none mt-4"
                onClick={onChangePassword}
              >
                Change Password
              </button>
            </>
          ) : (
            <>
              <div className="w-1/2 p-4 rounded-lg shadow-xl mt-6">
                <span className="text-green-500 text-xl">Email</span>
                <form>
                  <input
                    type="text"
                    value={u_email}
                    onChange={(e) => {
                      e.preventDefault();
                      setU_Email(e.target.value);
                    }}
                    className="w-full px-2 py-2 mt-2 bg-transparent border-b border-b-black text-white mb-8"
                    autoComplete="username"
                  />
                </form>
              </div>

              <button
                className="px-4 py-2 ml-3 bg-green-300 rounded-lg text-green-800 text-lg font-bold border-none hover:border-none mt-4"
                onClick={onResetPassword}
              >
                Reset Password
              </button>
            </>
          )}

          <p className="text-white text-sm mt-6">
            Don't have account?
            <Link to="/register">
              <span className="text-emerald-500 text-sm decoration-white decoration-solid">
                {" "}
                Register Here
              </span>
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
export default ResetPassword;
