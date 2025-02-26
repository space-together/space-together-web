"use client";
import {
  FormMessageError,
  FormMessageSuccess,
} from "@/components/form/formError";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  fetchAllClassRoomBySectorAPI,
  fetchAllClassRoomByTradeAPI,
  fetchAllSectorByEducation,
  getAllTradeABySectorPI,
} from "@/services/data/fetchDataFn";
import { classSchema, classSchemaType } from "@/utils/schema/classSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { ChangeEvent, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { SectorModelGet } from "@/types/sectorModel";
import { TradeModelGet } from "@/types/tradeModel";
import { ClassRoomModelGet } from "@/types/classRoomModel";
import UseTheme from "@/context/theme/use-theme";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import MyImage from "@/components/my-components/myImage";
import { Class, Education } from "../../../../../prisma/prisma/generated";
import { classTypeContext } from "@/utils/context/class-context";
import { updateClassAction } from "@/services/actions/class-action";
import { toLowerCase } from "@/utils/functions/characters";

interface props {
  educations: Education[];
  classModel: Class;
}

const UpdateClassForm = ({ educations, classModel }: props) => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const [education, setEducation] = useState<string | null>(null);
  const [sectors, setSectors] = useState<SectorModelGet[] | null>(null);
  const [trades, setTrades] = useState<TradeModelGet[] | null>(null);
  const [classRoom, setClassRoom] = useState<ClassRoomModelGet[] | null>(null);

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

  const form = useForm<classSchemaType>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      name: classModel.name ? classModel.name : "",
      username: classModel.username ? classModel.username : "",
      description: classModel.description ? classModel.description : "",
      education: "",
      is_public: "",
      sector: classModel.sectorId ? classModel.sectorId : "",
      trade: classModel.tradeId ? classModel.tradeId : "",
      class_room: classModel.classRoomId ? classModel.classRoomId : "",
      class_teacher: classModel.classTeacher ? classModel.classTeacher : "",
      image: classModel.symbol ? classModel.symbol : "",
      class_type: classModel.classType ? classModel.classType : "",
    },
    shouldFocusError: true,
    shouldUnregister: true,
    criteriaMode: "firstError",
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const handleSectors = async (id: string) => {
    setSectors(null);
    setTrades(null);
    setClassRoom(null);
    const get = await fetchAllSectorByEducation(id);
    if ("message" in get) {
      setSectors(null);
      return;
    }
    if (get.length == 0) {
      setSectors(null);
    }
    setSectors(get);
    return;
  };

  const handleTrades = async (id: string) => {
    setTrades(null);
    setClassRoom(null);
    const get = await getAllTradeABySectorPI(id);
    if ("message" in get) {
      setTrades(null);
      return handleClassRoomBySector(id);
    }
    if (get.length == 0) {
      setTrades(null);
      return handleClassRoomBySector(id);
    }
    return setTrades(get);
  };

  const handleClassRoomBySector = async (id: string) => {
    setClassRoom(null);
    const get = await fetchAllClassRoomBySectorAPI(id);
    if ("message" in get) return setClassRoom(null);
    if (get.length == 0) return setClassRoom(null);
    return setClassRoom(get);
  };

  const handleClassRoom = async (id: string) => {
    setClassRoom(null);
    const get = await fetchAllClassRoomByTradeAPI(id);
    if ("message" in get) {
      return setClassRoom(null);
    }
    if (get.length == 0) return setClassRoom(null);
    return setClassRoom(get);
  };

  const handleSubmit = (values: classSchemaType) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const action = await updateClassAction(classModel.id, values);
      if (action.error) {
        setError(action.error);
      }

      if (action.success) {
        setSuccess(action.success);
        form.reset();
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-3 p-8 happy-card"
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="flex gap-2 items-center">
              <FormLabel htmlFor="image" className="flex gap-3 items-center">
                <MyImage
                  src={field.value || "/default.jpg"}
                  className="size-24 min-h-24 min-w-24 rounded-full"
                  alt="Profile"
                />
                <span className="cursor-pointer">Sector Symbol</span>
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
        <div className=" flex sm:flex-row space-x-2 ">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className=" w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Education name"
                    disabled={isPending}
                  />
                </FormControl>
                <FormDescription>Class name which for class</FormDescription>
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
                  />
                </FormControl>
                <FormDescription>Class username</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* teacher and class type */}
        <div className=" flex sm:flex-row space-x-2 ">
          <FormField
            name="class_teacher"
            control={form.control}
            render={({ field }) => (
              <FormItem className=" w-full">
                <FormLabel>Class teacher</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Education name"
                    disabled={isPending}
                  />
                </FormControl>
                <FormDescription>Class teacher for class</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="class_type"
            render={({ field }) => (
              <FormItem className="space-y-3 w-full">
                <FormLabel>Class type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className=" flex space-x-2"
                  >
                    {classTypeContext.map((item, index) => (
                      <FormItem
                        key={index}
                        className=" space-x-3 items-center"
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
                <FormDescription>choose class type</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* education and sector*/}
        <div className=" sm:flex sm:gap-2">
          <FormField
            control={form.control}
            name="education"
            render={({ field }) => (
              <FormItem className=" w-full">
                <FormLabel>
                  Education <span className=" text-myGray">(Option)</span>
                </FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setEducation(value);
                    handleSectors(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="education" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent data-theme={UseTheme()}>
                    {educations.map((item) => {
                      return (
                        <SelectItem key={item.id} value={item.id}>
                          {item.username ? item.username : item.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormDescription>
                  select education which of class
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sector"
            render={({ field }) => (
              <FormItem className=" w-full">
                <FormLabel>
                  Sector <span className=" text-myGray">(Option)</span>
                </FormLabel>
                <Select
                  disabled={!education}
                  onValueChange={(value) => {
                    field.onChange(value);
                    setEducation(value);
                    handleTrades(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Sector" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent data-theme={UseTheme()}>
                    {sectors &&
                      sectors.map((item) => {
                        return (
                          <SelectItem key={item.id} value={item.id}>
                            {item.username ? item.username : item.name}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
                <FormDescription>
                  You can manage email addresses in your{" "}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* trades and class room */}
        <div className=" sm:flex sm:gap-2">
          <FormField
            control={form.control}
            name="trade"
            render={({ field }) => (
              <FormItem className=" w-full">
                <FormLabel>
                  Trades <span className=" text-myGray">(Option)</span>
                </FormLabel>
                <Select
                  disabled={!trades}
                  onValueChange={(value) => {
                    field.onChange(value);
                    setEducation(value);
                    handleClassRoom(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="education" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent data-theme={UseTheme()}>
                    {trades &&
                      trades.map((item) => {
                        return (
                          <SelectItem key={item.id} value={item.id}>
                            {item.username ? item.username : item.name}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
                <FormDescription>
                  select education which of class
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="class_room"
            render={({ field }) => (
              <FormItem className=" w-full">
                <FormLabel>
                  Class room <span className=" text-myGray">(Option)</span>
                </FormLabel>
                <Select
                  disabled={!classRoom}
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class room" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent data-theme={UseTheme()}>
                    {classRoom &&
                      classRoom.map((item) => {
                        return (
                          <SelectItem key={item.id} value={item.id}>
                            {item.username ? item.username : item.name}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
                <FormDescription>
                  You can manage email addresses in your{" "}
                </FormDescription>
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
              <FormDescription>Description of your class</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="is_public"
          control={form.control}
          render={({ field }) => (
            <FormItem className=" space-x-3">
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormLabel>Is public</FormLabel>
              <FormDescription>Class is public </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <FormMessageError message={error} />
          <FormMessageSuccess message={success} />
        </div>
        <div className="">
          <Button
            type="submit"
            variant="info"
            size="md"
            className="w-full"
            disabled={isPending}
          >
            Update class
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

export default UpdateClassForm;
