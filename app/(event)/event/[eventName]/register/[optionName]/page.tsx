"use client";
import AsyncButton from "@/components/ui/AsyncButton";
import CustomInput from "@/components/ui/CustomInput";
import { useRouter } from "next/navigation";
import React from "react";

export default function RegisterForm() {
  const router = useRouter();
  return (
    <div className="bg-brand-primary-50 mt-10">
      <div className="max-w-[80%] mx-auto  grid grid-cols-2 gap-4">
        <CustomInput
          label="Name"
          name="name"
          type="text"
          value=""
          onChange={() => {}}
        />
        <CustomInput
          label="Name"
          name="name"
          type="text"
          value=""
          onChange={() => {}}
        />
        <AsyncButton
          lable="Submit"
          onClick={() => {
            router.push("../pass");
          }}
        />
      </div>
    </div>
  );
}
