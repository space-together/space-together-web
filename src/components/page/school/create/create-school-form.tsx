"use client";

import type { Locale } from "@/i18n";

// Import Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

// Import Custom Components
import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import {
  AffiliationTypes,
  AttendanceSystems,
  schoolMembers,
  schoolTypes,
} from "@/lib/const/common-details-const";
import {
  schoolLabs,
  SchoolSportsExtracurricular,
} from "@/lib/context/school.context";
import { useZodFormSubmit } from "@/lib/hooks/use-zod-form-submit";
import {
  CreateSchoolSchema,
  type CreateSchool,
} from "@/lib/schema/school/create-school-schema";
import type { School } from "@/lib/schema/school/school-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { useRouter } from "next/navigation";

interface Props {
  lang: Locale;
  auth: AuthContext;
}

const CreateSchoolForm = ({ lang, auth }: Props) => {
  const router = useRouter();

  const { form, onSubmit, error, success, isPending } = useZodFormSubmit<
    CreateSchool,
    School
  >({
    schema: CreateSchoolSchema,
    formOptions: {
      defaultValues: {
        // Core
        username: "",
        name: "",

        // Optional visuals and metadata
        logo: undefined,
        description: "",

        // Categorical fields
        school_type: undefined,
        // curriculum: undefined,
        // education_level: undefined,
        accreditation_number: "",
        affiliation: undefined,
        school_members: "Mixed",

        // Location and contact
        address: {
          street: "",
          city: "",
          state: "",
          postal_code: "",
          country: "Rwanda",
          google_map_url: undefined,
        },
        contact: {
          phone: "",
          email: "",
        },
        website: undefined,
        social_media: [],

        // Academic and administrative characteristics
        student_capacity: undefined,
        uniform_required: true,
        attendance_system: "Online",
        scholarship_available: false,

        // Facilities
        classrooms: undefined,
        library: true,
        labs: [],
        sports_extracurricular: [],
        online_classes: true,
      },
    },
    transform: (values) => {
      return {
        ...values,
        sports_extracurricular:
          values.sports_extracurricular?.map((sport) => sport.value) ?? [],
        labs: values.labs?.map((lab) => lab.value) ?? [],
        creator_id: auth.user.id,
      };
    },
    request: {
      method: "post",
      url: `/schools`,
      apiRequest: {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    },
    onSuccessMessage: "School is registered successfully",
    toastOnError: true,
    onSuccess: (school) => {
      router.push(`/${lang}/s-t/new/${school.username}/academic`);
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="basic-card space-y-6 shadow-sm"
      >
        {/* Section: Basic Info */}
        <div className="">
          <h3 className="mb-4 text-lg font-medium">Basic Information</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* School Name */}
            <CommonFormField
              control={form.control}
              name="name"
              label="School name"
              required
              inputProps={{ placeholder: "e.g., My school name" }}
              disabled={isPending}
            />

            {/* School Username */}
            <CommonFormField
              control={form.control}
              name="username"
              label="School Username"
              required
              inputProps={{ placeholder: "e.g., my_school_name" }}
              disabled={isPending}
            />
            <CommonFormField
              control={form.control}
              name="school_type"
              label="School Type"
              required
              fieldType="select"
              selectOptions={schoolTypes.map((type) => ({
                value: type,
                label: type,
              }))}
              disabled={isPending}
            />
            <CommonFormField
              control={form.control}
              name="school_members"
              label="School Members"
              required
              fieldType="select"
              selectOptions={schoolMembers.map((type) => ({
                value: type,
                label: type,
              }))}
              disabled={isPending}
            />
          </div>

          <CommonFormField
            control={form.control}
            name="logo"
            label="School Logo"
            disabled={isPending}
            fieldType="image"
            classname="mt-4"
          />

          <CommonFormField
            control={form.control}
            name="description"
            fieldType="textarea"
            label="Description"
            placeholder="Tell us a little bit about your school"
            classname="mt-4"
            className="min-h-[100px] resize-y"
          />
        </div>

        {/* Section: Academic Details */}
        <div className="">
          <h3 className="mb-4 text-lg font-medium">Academic Details</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Accreditation Number */}
            <CommonFormField
              control={form.control}
              name="accreditation_number"
              label="Accreditation Number"
              placeholder="Optional accreditation number"
              fieldType="input"
              type="number"
            />

            <CommonFormField
              control={form.control}
              name="affiliation"
              label="Affiliation"
              placeholder="Select school affiliation"
              fieldType="select"
              selectOptions={AffiliationTypes.map((type) => ({
                label: type,
                value: type,
              }))}
            />
          </div>
        </div>

        {/* Section: Contact & Location */}
        <div className="">
          <h3 className="mb-4 text-lg font-medium">Contact & Location</h3>
          {/* Address Fields */}
          <CommonFormField
            control={form.control}
            name="address"
            fieldType="address"
            label="Address details"
            disabled={isPending}
          />

          {/* Contact Fields */}
          <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <CommonFormField
              label="Phone number"
              control={form.control}
              name="contact.phone"
              fieldType="phone"
              disabled={isPending}
              placeholder="e.g., +250 7** *** ***"
            />

            <CommonFormField
              control={form.control}
              name="contact.email"
              fieldType="input"
              label="Email address"
              type="email"
              disabled={isPending}
              placeholder="e.g., school@example.com"
            />
          </div>

          {/* Website */}
          <CommonFormField
            control={form.control}
            name="website"
            fieldType="input"
            label="Website"
            type="url"
            placeholder="e.g., https://www.schoolwebsite.com"
            disabled={isPending}
          />
        </div>

        {/* Section: Facilities & Operations */}
        <div className="">
          <h3 className="mb-4 text-lg font-medium">Facilities & Operations</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Student Capacity */}
            <CommonFormField
              control={form.control}
              name="student_capacity"
              fieldType="input"
              label="Student Capacity"
              type="number"
              inputProps={{ min: 1 }}
              placeholder="Total student capacity"
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="classrooms"
              label="Number of classrooms"
              type="number"
              inputProps={{ min: 1 }}
              placeholder="Number of classrooms"
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="attendance_system"
              label="Attendance system"
              fieldType="select"
              selectOptions={AttendanceSystems.map((type) => ({
                label: type,
                value: type,
              }))}
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="uniform_required"
              label="Uniform required?"
              fieldType="checkbox"
              disabled={isPending}
            />
            <CommonFormField
              control={form.control}
              name="scholarship_available"
              label="Scholarships Available?"
              fieldType="checkbox"
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="library"
              label="Library Available?"
              fieldType="checkbox"
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="online_classes"
              label="Online Classes Offered?"
              fieldType="checkbox"
              disabled={isPending}
            />

            <CommonFormField
              control={form.control}
              name="labs"
              label="Labs Available"
              fieldType="multipleSelect"
              selectOptions={schoolLabs}
              placeholder="e.g., Science Lab, Computer Lab"
            />
            <CommonFormField
              control={form.control}
              name="sports_extracurricular"
              label="Sports & Extracurricular"
              fieldType="multipleSelect"
              selectOptions={SchoolSportsExtracurricular}
              placeholder="e.g., Football, Debate Club, Music"
            />
          </div>
        </div>

        {/* Submission Area */}
        <div className="mt-2">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>

        <Button
          disabled={
            isPending ||
            (!form.formState.isDirty && !form.formState.isSubmitSuccessful)
          }
          type="submit"
          library="daisy"
          variant={"info"}
          className="w-full"
          role={isPending ? "loading" : undefined}
        >
          Create school
        </Button>
      </form>
    </Form>
  );
};

export default CreateSchoolForm;
