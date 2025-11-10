import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react"; // icons from lucide-react
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const defaultFormValues = {
  firstName: "thih",
  lastName: "asdasd",
  email: "user@gmail.com",
  mobile: "1234567890",
  username: "useuser",
  password: "User@1234",
  age: "12",
  isActive: true,
  userType: "",
};

import { IZodSchema } from "./IZodSchema";
import { toast } from "sonner";
import axios from "axios";

const RhfForm = () => {
  const form = useForm({
    resolver: zodResolver(IZodSchema),
    defaultValues: defaultFormValues,
    mode: "onChange",
  });

  const { register, control, handleSubmit, formState } = form;
  const { errors, isValid, isDirty } = formState;
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("https://dummyjson.com/users/adds", data, {
        headers: { "Content-Type": "application/json" },
      });

      const apiData = {
        status: true, // false
        statusCode: 200,
        message: "Success",
        data: {
          name: "Meet",
        },
      };

      console.log("User added:", res.data);
      if (apiData.status) {
        toast.success("Added user successfully");
        form.reset({ ...defaultFormValues });
      } else {
        // handle errors
        // do something on error
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      // handle errors
      // do something on error
    }

    // console.log("Form Submitted", data);
  };

  return (
    <div className="flex items-center justify-center mt-6">
      <Card className="w-full max-w-6xl bg-[#cbb3ff] border-2 border-black shadow-lg ">
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            {/* Firstname */}
            <div className="flex flex-col gap-2">
              <label htmlFor="firstName" className="font-medium">
                Firstname
              </label>
              <Input
                type="text"
                id="firstName"
                {...register("firstName")}
                className="bg-white border-2 border-black"
                placeholder="Enter first name"
              />
              <p className="text-red-600 text-sm">
                {errors.firstName?.message}
              </p>
            </div>

            {/* Lastname */}
            <div className="flex flex-col gap-2">
              <label htmlFor="lastName" className="font-medium">
                Lastname
              </label>
              <Input
                type="text"
                id="lastName"
                {...register("lastName")}
                className="bg-white border-2 border-black"
                placeholder="Enter last name"
              />
              <p className="text-red-600 text-sm">{errors.lastName?.message}</p>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <Input
                type="email"
                id="email"
                {...register("email")}
                className="bg-white border-2 border-black"
                placeholder="Enter your email"
              />
              <p className="text-red-600 text-sm">{errors.email?.message}</p>
            </div>

            {/* Mobile */}
            <div className="flex flex-col gap-2">
              <label htmlFor="mobile" className="font-medium">
                Mobile Number
              </label>
              <Input
                type="text"
                id="mobile"
                {...register("mobile")}
                className="bg-white border-2 border-black"
                placeholder="Enter mobile number"
              />
              <p className="text-red-600 text-sm">{errors.mobile?.message}</p>
            </div>

            {/* Username */}
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="font-medium">
                Username
              </label>
              <Input
                type="text"
                id="username"
                {...register("username")}
                className="bg-white border-2 border-black"
                placeholder="Enter username"
              />
              <p className="text-red-600 text-sm">{errors.username?.message}</p>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="password" className="font-medium">
                Password
              </label>

              {/* Input wrapper */}
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="bg-white border-2 border-black pr-10"
                  placeholder="Enter password"
                />

                {/* Eye toggle button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-2 flex items-center text-gray-600 hover:text-black"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Error message */}
              <p className="text-red-600 text-sm">{errors.password?.message}</p>
            </div>

            {/* Pin */}
            <div className="flex flex-col gap-2">
              <label htmlFor="age" className="font-medium">
                Pin
              </label>
              <Input
                type="text"
                id="age"
                {...register("age")}
                className="bg-white border-2 border-black"
                placeholder="Enter age"
              />
              <p className="text-red-600 text-sm">{errors.age?.message}</p>
            </div>

            {/* IsActive Switch */}
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <div className="flex items-center gap-3 mt-5">
                  <Switch
                    id="isActive"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <label htmlFor="isActive" className="font-medium">
                    IsActive
                  </label>
                </div>
              )}
            />

            {/* User Type Select */}
            <Controller
              name="userType"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  className="mt-5"
                >
                  <SelectTrigger className="w-[180px] bg-white border-2 border-black">
                    <SelectValue placeholder="Select user type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="employee">Employee</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </CardContent>

        <CardFooter className="flex gap-2 justify-end mt-4">
          <Button
            onClick={() => {
              handleSubmit(onSubmit, (error) => {
                console.log("error", error);
              })();
            }}
            className="rounded-l-full border-2 border-black px-8"
            disabled={!isDirty || !isValid}
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
      {/* {process.env.node_env === "developmnent" &&
      
    } */}
      <DevTool control={control} />
    </div>
  );
};

export default RhfForm;
