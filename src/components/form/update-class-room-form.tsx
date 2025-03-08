"use client";

import {
  FormMessageError,
  FormMessageSuccess,
} from "@/components/form/formError";
import { Button } from "@/components/ui/button";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  classRoomSchema,
  classRoomSchemaType,
} from "@/utils/schema/classRoomSchema";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { ChangeEvent, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import MyImage from "@/components/my-components/myImage";
import { classRoomTypeContext } from "@/utils/context/class-room-context";
import { toLowerCase } from "@/utils/functions/characters";
import { updateMainClassAPI } from "@/services/data/api-fetch-data";
import { handleFormSubmission } from "@/hooks/form-notification";
import { ClassRoom, Sector, Trade } from "../../../prisma/prisma/generated";
interface props {
  sectors: Sector[] | undefined;
  trades: Trade[] | null;
  currentMainClass: ClassRoom
}
const UpdateClassRoomForm = ({ sectors, trades, currentMainClass }: props) => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    setError("");
    e.preventDefault();

    if (e.target.files?.[0]) {
      const file = e.target.files[0];

      if (!file.type.includes("image")) {
        return setError("Please select an image file.");
      }

      if (file.size > 2 * 1024 * 1024) {
        return setError("Image size exceeds 2MB.");
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const imageDataUrl = event.target?.result as string;
        fieldChange(imageDataUrl);
      };
      reader.onerror = () => setError("Failed to read image file.");
      reader.readAsDataURL(file);
    }
  };

  const form = useForm<classRoomSchemaType>({
    resolver: zodResolver(classRoomSchema),
    defaultValues: {
      name:currentMainClass.name? currentMainClass.name : "",
      username:currentMainClass.username? currentMainClass.username : "",
      description: currentMainClass.description? currentMainClass.description :"",
      trade:currentMainClass?.trade_id? currentMainClass.trade_id : "",
      sector: currentMainClass?.sector_id? currentMainClass.sector_id :"",
      class_room_type: currentMainClass.class_room_type? currentMainClass.class_room_type : undefined,
      symbol: currentMainClass.symbol? currentMainClass.symbol : undefined,
    },
    shouldFocusError: true,
    shouldUnregister: true,
    criteriaMode: "firstError",
    reValidateMode: "onChange",
    mode: "onChange",
  });
  const handleSubmit = (values: classRoomSchemaType) => {
    setError("");
    setSuccess("");
    handleFormSubmission(() => updateMainClassAPI(values, currentMainClass.id), startTransition);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-3 w-full"
      >
        <div className=" flex space-x-2">
          <FormField
            control={form.control}
            name="symbol"
            render={({ field }) => (
              <FormItem className="flex gap-2 items-center">
                <FormLabel htmlFor="image" className="flex gap-3 items-center">
                  <MyImage
                    src={field.value || "/default.jpg"}
                    className="size-24 min-h-24 min-w-24 rounded-full"
                    alt="Profile"
                  />
                  <span className="cursor-pointer">Symbol</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    id="image"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImage(e, field.onChange)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className=" sm:flex sm:gap-2 w-full flex-col space-y-2">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="class room name"
                      disabled={isPending}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Username"
                      disabled={isPending}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {/* class room types */}
        <div className="  flex space-x-8">
          {/* class room sector */}
          <FormField
            control={form.control}
            name="sector"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Sectors</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {sectors &&
                      sectors.map((item) => (
                        <FormItem
                          key={item.id}
                          className="flex items-center space-x-3 space-y-"
                        >
                          <FormControl>
                            <RadioGroupItem value={item.id} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.username ? item.username : item.name}
                          </FormLabel>
                        </FormItem>
                      ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            {trades &&
          <FormField
            control={form.control}
            name="trade"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Trades</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-3"
                  >
                      {trades.map((item) => (
                        <FormItem
                          key={item.id}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={item.id} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.username ? item.username : item.name}
                          </FormLabel>
                        </FormItem>
                      ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
          }
        </div>
        <div>
          <FormField
            control={form.control}
            name="class_room_type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Class room types</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-y-1"
                  >
                    {classRoomTypeContext.map((item, index) => (
                      <FormItem
                        key={index}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={item} />
                        </FormControl>
                        <FormLabel className="font-normal capitalize">
                          {toLowerCase(item)}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Description"
                  disabled={isPending}
                  className=" resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <FormMessageError message={error} />
          <FormMessageSuccess message={success} />
        </div>
        <div className="px-6 pb-6 sm:justify-end flex space-x-2">
          <Button
            type="submit"
            variant="info"
            size="sm"
            className="w-full sm:w-auto"
            disabled={isPending}
          >
            update main class
            {isPending && (
              <LoaderCircle
                className="-ms-1 me-2 animate-spin"
                size={12}
                strokeWidth={2}
                aria-hidden="true"
              />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateClassRoomForm;
