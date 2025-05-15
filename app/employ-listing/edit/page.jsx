"use client";

import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { addFormSchema } from "../add/_components/add-form/add-form-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function EditForm() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const queryClient = useQueryClient();

  // Get existing employees array from cache
  const allEmployees = queryClient.getQueryData(["employ"]) ?? [];
  const employee = allEmployees.find((e) => e.id === id);

  // Initialize form with employee data if available
  const [formReady, setFormReady] = React.useState(false);
  
  const form = useForm({
    resolver: zodResolver(addFormSchema),
    defaultValues: employee ? {
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      mobile: employee.mobile,
      type: employee.type || "regular",
      town: employee.town,
      city: employee.city,
      state: employee.state,
      country: employee.country,
      pincode: employee.pincode,
      address: employee.address,
      salary: employee.salary || "0 to 25 k",
    } : {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      type: "regular",
      town: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      address: "",
      salary: "0 to 25 k",
    },
  });

  // When employee is available, reset form fields
  useEffect(() => {
    if (employee) {
      // console.log("Setting employee data:", employee);
      // console.log("Employee salary:", employee.salary);
      
      form.reset({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        mobile: employee.mobile,
        type: employee.type || "regular",
        town: employee.town,
        city: employee.city,
        state: employee.state,
        country: employee.country,
        pincode: employee.pincode,
        address: employee.address,
        salary: employee.salary || "0 to 25 k",
      });
      
      setFormReady(true);
    }
  }, [employee, form]);

  // Add a manual effect to directly update the field value if needed
  useEffect(() => {
    if (employee && formReady) {
      // Force update the salary field specifically
      form.setValue("salary", employee.salary || "0 to 25 k");
    }
  }, [employee, formReady, form]);
  
  const mutation = useMutation({
    mutationFn: async (updated) => {
      console.log("mutationFn received:", updated);
      return new Promise((resolve) => setTimeout(() => resolve(updated), 500));
    },
    onError: (err) => {
      console.error("update failed:", err);
    },
    onSuccess: (data) => {
      console.log("mutation succeeded:", data);
      queryClient.setQueryData(["employ"], (old) =>
        old ? old.map((e) => (e.id === id ? { ...e, ...data } : e)) : [data]
      );
      // push back to listing
      router.push("/employ-listing");
    },
  });

  const onSubmit = (values) => {
    console.log("onSubmit values:", values);
    if (!employee) return;
    mutation.mutate({ id, ...values });
  };

  // Don't show form until employee data is loaded and form is ready
  if (!id) {
    return <p className="p-4 text-red-500">No ID provided.</p>;
  }
  if (!employee) {
    return <p className="p-4 text-gray-500">Employee not found.</p>;
  }
  if (!formReady) {
    return <p className="p-4 text-gray-500">Loading employee data...</p>;
  }

  return (
    <div className="p-4 mx-auto w-[80%]">
      <p className="text-center pb-10 text-2xl">
        EDIT {employee.firstName} DATA
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* First Name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Last Name */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Mobile */}
          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Type */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="flex gap-4"
                  >
                    <FormItem>
                      <RadioGroupItem value="regular" />
                      <FormLabel className="pl-2">Regular</FormLabel>
                    </FormItem>
                    <FormItem>
                      <RadioGroupItem value="new" />
                      <FormLabel className="pl-2">New</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Town */}
          <FormField
            control={form.control}
            name="town"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Town</FormLabel>
                <FormControl>
                  <Input placeholder="Greenfield" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* City */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Springfield" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* State */}
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="California" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Country */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="USA" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Pincode */}
          <FormField
            control={form.control}
            name="pincode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pincode</FormLabel>
                <FormControl>
                  <Input placeholder="90001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address (Textarea) */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Bhagat Colony near, Sukhadev Lake"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Salary (Select) */}
          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => {
              // Log the current field value for debugging
              console.log("Salary field render value:", field.value);
              
              return (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select salary range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0 to 25 k">0 to 25 k</SelectItem>
                        <SelectItem value="25 to 50 k">25 to 50 k</SelectItem>
                        <SelectItem value="50 to 75 k">50 to 75 k</SelectItem>
                        <SelectItem value="75 to 100 k">75 to 100 k</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* Submit */}
          <div className="flex items-center justify-center">
            <Button type="submit" disabled={mutation.isLoading}>
              {mutation.isLoading ? "Saving…" : "Save"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.push("/employ-listing")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

