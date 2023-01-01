import { Controller, useForm } from "react-hook-form";
import { LoginFormType, LoginResponse } from "~/features/auth/types";
import { TextField } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useMutation } from "@tanstack/react-query";
import { ApiResponse, ApiResponseError } from "~/type";
import API from "~/network";
import { LoadingButton } from "@mui/lab";
import { useGoogleLogin } from "@react-oauth/google";
import React from "react";
import { deleteKey, getPreviousUrl, setToken } from "~/utils";
import { useNavigate } from "react-router-dom";

function Login() {
  const { control, handleSubmit } = useForm<LoginFormType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const handleLoginSuccess = (response: ApiResponse<LoginResponse>) => {
    setToken(response.data.access_token);
    const previousUrl = getPreviousUrl();
    if (previousUrl) {
      navigate(previousUrl);
      deleteKey("previous_url");
    }
  };

  const login = useMutation<
    ApiResponse<LoginResponse>,
    ApiResponseError,
    LoginFormType
  >({
    mutationFn: async (data) => {
      const response = await API.post("/v1/auth/login", data);
      return response.data;
    },
    onError(error) {
      console.log(error);
    },
    onSuccess: handleLoginSuccess,
  });

  const loginGoogle = useMutation<
    ApiResponse<LoginResponse>,
    ApiResponseError,
    string
  >({
    mutationFn: async (code) => {
      const response = await API.post("/v1/auth/login/google", { code });
      return response.data;
    },
    onSuccess: handleLoginSuccess,
  });

  const submit = (data: LoginFormType) => {
    login.mutate(data);
  };

  const handleLoginGoogle = useGoogleLogin({
    onSuccess(response) {
      loginGoogle.mutate(response.code);
    },
    flow: "auth-code",
  });

  return (
    <div className={"tw-flex tw-justify-center tw-h-screen"}>
      <div className={"tw-flex tw-flex-col tw-justify-center tw-w-2/5"}>
        <form
          onSubmit={handleSubmit(submit)}
          className={"tw-bg-gray-800 tw-px-5 tw-py-10 tw-rounded-xl"}
        >
          <div className={"tw-grid tw-grid-cols-1 tw-gap-10 "}>
            <>
              <div className={"tw-text-center tw-text-2xl tw-font-bold"}>
                Đăng nhập
              </div>
              {login.error ||
                (loginGoogle.error && (
                  <div
                    className={
                      "tw-text-red-500 tw-font-semibold tw-text-center"
                    }
                  >
                    {"Thông tin đăng nhập không hợp lệ"}
                  </div>
                ))}
              <Controller
                control={control}
                name={"email"}
                render={({ field }) => <TextField label={"Email"} {...field} />}
              />
              <Controller
                control={control}
                name={"password"}
                render={({ field }) => (
                  <TextField label={"Password"} {...field} type={"password"} />
                )}
              />
              <div>
                <LoadingButton
                  loading={login.isLoading}
                  type={"submit"}
                  size={"large"}
                  fullWidth
                  variant={"contained"}
                >
                  Đăng nhập
                </LoadingButton>
              </div>
              <div>
                <LoadingButton
                  onClick={handleLoginGoogle}
                  fullWidth
                  startIcon={<GoogleIcon />}
                >
                  Login Google
                </LoadingButton>
              </div>
            </>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
