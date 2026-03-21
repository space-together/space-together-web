"use client";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { FormError, FormSuccess } from "@/components/common/form-message";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  GenderDetails,
  UserRoleDetails,
} from "@/lib/const/common-details-const";
import { useToast } from "@/lib/context/toast/ToastContext";
import {
  type CreateUser,
  CreateUserSchema,
} from "@/lib/schema/user/create-user-schema";
import type { UserModel } from "@/lib/schema/user/user-schema";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import type { AuthContext } from "@/lib/utils/auth-context";
import { CheckIcon, EyeIcon, EyeOffIcon, XIcon } from "lucide-react";
import { type ChangeEvent, useMemo, useState } from "react";

interface props {
  auth: AuthContext;
}

const CreateUserForm = ({ auth }: props) => {
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const { showToast } = useToast();

  const toggleSeePassword = () => setSeePassword((prev) => !prev);

  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[0-9]/, text: "At least 1 number" },
      { regex: /[a-z]/, text: "At least 1 lowercase letter" },
      { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
    ];
    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = checkStrength(password);
  const strengthScore = useMemo(
    () => strength.filter((req) => req.met).length,
    [strength],
  );

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-border";
    if (score <= 1) return "bg-red-500";
    if (score <= 2) return "bg-orange-500";
    if (score === 3) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const getStrengthText = (score: number) => {
    if (score === 0) return "Enter a password";
    if (score <= 2) return "Weak password";
    if (score === 3) return "Medium password";
    return "Strong password";
  };

  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    CreateUser,
    UserModel
  >({
    schema: CreateUserSchema,
    formOptions: {
      defaultValues: {
        name: "",
        email: "",
        username: "",
        password_hash: "",
        phone: "",
        bio: "",
        role: undefined,
        gender: undefined,
        address: {
          country: "",
          province: "",
          district: "",
          sector: "",
          cell: "",
          village: "",
          state: "",
          postal_code: "",
          google_map_url: "",
        },
        age: { year: undefined, month: undefined, day: undefined },
      },
      mode: "onChange",
    },
    request: {
      method: "post",
      url: "/users",
      apiRequest: { token: auth.token },
    },
    onSuccessMessage: "User created successfully",
    toastOnError: true,
    onSuccess: (data) => {
      showToast({
        title: "User created successfully 😁",
        description: <div>user: {data.name}</div>,
        type: "success",
      });
      form.reset();
      setPassword("");
    },
  });

  const handlePasswordChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void,
  ) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    fieldChange(newPassword);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex w-full justify-between space-x-4">
          <div className="flex w-full flex-col justify-start space-y-4">
            <CommonFormField
              name="name"
              control={form.control}
              label="Full Name"
              required
              placeholder="Enter full name"
              disabled={isPending}
              className="h-12 text-base"
            />

            <CommonFormField
              name="username"
              control={form.control}
              label="Username"
              placeholder="Enter username (optional)"
              disabled={isPending}
              className="h-12 text-base"
            />

            <CommonFormField
              name="email"
              control={form.control}
              label="Email Address"
              required
              type="email"
              placeholder="email@example.com"
              disabled={isPending}
              className="h-12 text-base"
            />

            <CommonFormField
              name="phone"
              control={form.control}
              label="Phone"
              placeholder="+250 7..."
              disabled={isPending}
              className="h-12 text-base"
            />

            <CommonFormField
              name="password_hash"
              control={form.control}
              label="Password"
              required
              fieldType="custom"
              disabled={isPending}
              render={({ field, disabled }) => (
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      className="h-12 pr-10 text-base"
                      type={seePassword ? "text" : "password"}
                      placeholder="Enter password"
                      disabled={disabled}
                      name={field.name}
                      ref={field.ref}
                      value={typeof field.value === "string" ? field.value : ""}
                      onBlur={field.onBlur}
                      onChange={(e) => handlePasswordChange(e, field.onChange)}
                    />
                    <button
                      className="absolute inset-y-0 right-0 flex h-full w-10 items-center justify-center rounded-r-md"
                      type="button"
                      onClick={toggleSeePassword}
                      aria-label={
                        seePassword ? "Hide password" : "Show password"
                      }
                    >
                      {seePassword ? (
                        <EyeOffIcon size={18} />
                      ) : (
                        <EyeIcon size={18} />
                      )}
                    </button>
                  </div>
                  <div
                    className="bg-border mt-3 mb-2 h-1 w-full overflow-hidden rounded-full"
                    role="progressbar"
                    aria-valuenow={strengthScore}
                    aria-valuemin={0}
                    aria-valuemax={4}
                    aria-label="Password strength"
                  >
                    <div
                      className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
                      style={{ width: `${(strengthScore / 4) * 100}%` }}
                    />
                  </div>
                  <p className="mb-2 text-sm font-medium">
                    {getStrengthText(strengthScore)}. Must contain:
                  </p>
                  <ul className="grid grid-cols-2 gap-1 text-sm">
                    {strength.map((req, index) => (
                      <li key={index} className="flex items-center gap-2">
                        {req.met ? (
                          <CheckIcon size={16} className="text-emerald-500" />
                        ) : (
                          <XIcon size={16} className="text-muted-foreground" />
                        )}
                        <span
                          className={
                            req.met
                              ? "text-emerald-600"
                              : "text-muted-foreground"
                          }
                        >
                          {req.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            />

            <CommonFormField
              name="role"
              control={form.control}
              label="User Role"
              required
              fieldType="radio-input"
              items={UserRoleDetails}
              disabled={isPending}
              className="flex flex-row flex-wrap gap-2"
            />
          </div>

          <div className="flex w-full flex-col justify-start space-y-4">
            <CommonFormField
              control={form.control}
              name="image"
              label="Profile Image"
              fieldType="image"
              disabled={isPending}
              className="w-full md:mb-4"
            />

            <CommonFormField
              name="gender"
              control={form.control}
              label="Gender"
              fieldType="radio-input"
              items={GenderDetails}
              disabled={isPending}
              className="flex flex-row flex-wrap gap-2"
            />

            <CommonFormField
              control={form.control}
              name="age"
              label="Age"
              fieldType="age"
              disabled={isPending}
              classname="w-full"
            />

            <CommonFormField
              name="bio"
              control={form.control}
              label="Bio"
              fieldType="textarea"
              placeholder="Enter a short bio (optional)"
              disabled={isPending}
              className="min-h-24 resize-none"
            />
          </div>
        </div>

        <CommonFormField
          control={form.control}
          name="address"
          label="Address information"
          fieldType="address"
          disabled={isPending}
          classname="w-full"
        />

        <div>
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button size="sm" type="button" library="daisy">
              Cancel
            </Button>
          </DialogClose>
          <Button
            size="sm"
            variant="info"
            disabled={isPending}
            type="submit"
            library="daisy"
          >
            Create user{" "}
            {isPending && <span className="loading loading-spinner" />}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default CreateUserForm;
