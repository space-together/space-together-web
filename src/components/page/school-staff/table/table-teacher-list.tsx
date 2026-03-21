"use client";

import MyImage from "@/components/common/myImage";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  type EditTeacherForm,
  editTeacherFormSchema,
  type NewTeacherForm,
  newTeacherFormSchema,
} from "@/lib/schema/table-forms/teacher-forms";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  MoreHorizontal,
  Search,
  Trash2,
  UserPlus,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// Available classes and subjects
const availableClasses = ["L1", "L2", "L3"];
const availableSubjects = [
  "Mathematics",
  "Science",
  "English",
  "History",
  "Geography",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
];

// Initial teacher data
const initialTeachers = [
  {
    id: "1",
    name: "Teacher name",
    email: "example@email.com",
    gender: "Male",
    experience: "5 Years",
    classes: ["L1", "L2"],
    subjects: ["Mathematics", "Physics"],
    phone: "0788729026",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Teacher name",
    email: "example@email.com",
    gender: "Female",
    experience: "8 Years",
    classes: ["L3"],
    subjects: ["Biology", "Chemistry"],
    phone: "0788729026",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Teacher name",
    email: "example@email.com",
    gender: "Male",
    experience: "3 Years",
    classes: ["L1"],
    subjects: ["English", "History"],
    phone: "0788729026",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Teacher name",
    email: "example@email.com",
    gender: "Female",
    experience: "10 Years",
    classes: ["L2", "L3"],
    subjects: ["Computer Science"],
    phone: "0788729026",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Teacher name",
    email: "example@email.com",
    gender: "Male",
    experience: "7 Years",
    classes: ["L1", "L3"],
    subjects: ["Geography", "History"],
    phone: "0788729026",
    image: "/placeholder.svg?height=40&width=40",
  },
];

export default function TeacherList() {
  // State for selected teachers
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([]);

  // State for teacher data
  const [teachers, setTeachers] = useState(initialTeachers);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const teachersPerPage = 5;

  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("All gender");
  const [classFilter, setClassFilter] = useState("All classes");
  const [subjectFilter, setSubjectFilter] = useState("All subjects");
  const [minExperience, setMinExperience] = useState("");
  const [maxExperience, setMaxExperience] = useState("");

  // State for dialog open status
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState<string | null>(null);
  const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false);

  // Form for adding a new teacher
  const addTeacherForm = useForm<NewTeacherForm>({
    resolver: zodResolver(newTeacherFormSchema),
    defaultValues: {
      name: "",
      email: "",
      gender: "Male",
      experience: "",
      classes: [],
      subjects: [],
      phone: "",
    },
  });

  // Form for editing a teacher
  const editTeacherForm = useForm<EditTeacherForm>({
    resolver: zodResolver(editTeacherFormSchema),
    defaultValues: {
      id: "",
      name: "",
      email: "",
      gender: "Male",
      experience: "",
      classes: [],
      subjects: [],
      phone: "",
    },
  });

  // Form for filters
  const filterForm = useForm({
    defaultValues: {
      searchTerm: "",
      genderFilter: "All gender",
      classFilter: "All classes",
      subjectFilter: "All subjects",
      minExperience: "",
      maxExperience: "",
    },
  });

  // Toggle teacher selection
  const toggleTeacher = (id: string) => {
    setSelectedTeachers((prev) =>
      prev.includes(id)
        ? prev.filter((teacherId) => teacherId !== id)
        : [...prev, id],
    );
  };

  // Toggle all teachers selection
  const toggleAllTeachers = () => {
    if (selectedTeachers.length === currentTeachers.length) {
      setSelectedTeachers([]);
    } else {
      setSelectedTeachers(currentTeachers.map((teacher) => teacher.id));
    }
  };

  // Handle adding a new teacher
  const handleAddTeacher = (data: NewTeacherForm) => {
    const newId = (teachers.length + 1).toString();
    const teacherToAdd = {
      ...data,
      id: newId,
      experience: data.experience + " Years",
      image: "/placeholder.svg?height=40&width=40",
    };

    setTeachers([...teachers, teacherToAdd]);
    setIsAddDialogOpen(false);
    addTeacherForm.reset();
  };

  // Prepare teacher for editing
  const prepareTeacherForEdit = (teacher: (typeof initialTeachers)[0]) => {
    const experience = teacher.experience.replace(" Years", "");
    editTeacherForm.reset({
      id: teacher.id,
      name: teacher.name,
      email: teacher.email,
      gender: teacher.gender as "Male" | "Female",
      experience: experience,
      classes: teacher.classes,
      subjects: teacher.subjects,
      phone: teacher.phone,
    });
    setIsEditDialogOpen(true);
  };

  // Handle editing a teacher
  const handleEditTeacher = (data: EditTeacherForm) => {
    setTeachers(
      teachers.map((teacher) =>
        teacher.id === data.id
          ? {
              ...teacher,
              name: data.name,
              email: data.email,
              gender: data.gender,
              experience: data.experience.includes("Years")
                ? data.experience
                : data.experience + " Years",
              classes: data.classes,
              subjects: data.subjects,
              phone: data.phone,
            }
          : teacher,
      ),
    );

    setIsEditDialogOpen(false);
  };

  // Handle deleting a teacher
  const handleDeleteTeacher = (id: string) => {
    setTeachers(teachers.filter((teacher) => teacher.id !== id));
    setSelectedTeachers(
      selectedTeachers.filter((teacherId) => teacherId !== id),
    );
    setTeacherToDelete(null);
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    setTeachers(
      teachers.filter((teacher) => !selectedTeachers.includes(teacher.id)),
    );
    setSelectedTeachers([]);
    setIsBulkDeleteDialogOpen(false);
  };

  // Apply filters from form
  const applyFilters = (data: any) => {
    setSearchTerm(data.searchTerm || "");
    setGenderFilter(data.genderFilter);
    setClassFilter(data.classFilter);
    setSubjectFilter(data.subjectFilter);
    setMinExperience(data.minExperience || "");
    setMaxExperience(data.maxExperience || "");
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Filter teachers based on search and filters
  const filteredTeachers = teachers.filter((teacher) => {
    // Search filter
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase());

    // Gender filter
    const matchesGender =
      genderFilter === "All gender" || teacher.gender === genderFilter;

    // Class filter
    const matchesClass =
      classFilter === "All classes" || teacher.classes.includes(classFilter);

    // Subject filter
    const matchesSubject =
      subjectFilter === "All subjects" ||
      teacher.subjects.includes(subjectFilter);

    // Experience filter
    const teacherExperience = Number.parseInt(teacher.experience.split(" ")[0]);
    const matchesMinExperience =
      !minExperience || teacherExperience >= Number.parseInt(minExperience);
    const matchesMaxExperience =
      !maxExperience || teacherExperience <= Number.parseInt(maxExperience);

    return (
      matchesSearch &&
      matchesGender &&
      matchesClass &&
      matchesSubject &&
      matchesMinExperience &&
      matchesMaxExperience
    );
  });

  // Calculate pagination
  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = filteredTeachers.slice(
    indexOfFirstTeacher,
    indexOfLastTeacher,
  );
  const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage);

  // Reset to first page when filtered results change
  useEffect(() => {
    if (currentPage > Math.max(1, totalPages)) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [filteredTeachers.length, totalPages, currentPage]);

  // Handle pagination
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Update filter form when filter state changes
  useEffect(() => {
    filterForm.setValue("searchTerm", searchTerm);
    filterForm.setValue("genderFilter", genderFilter as any);
    filterForm.setValue("classFilter", classFilter as any);
    filterForm.setValue("subjectFilter", subjectFilter as any);
    filterForm.setValue("minExperience", minExperience);
    filterForm.setValue("maxExperience", maxExperience);
  }, [
    searchTerm,
    genderFilter,
    classFilter,
    subjectFilter,
    minExperience,
    maxExperience,
    filterForm,
  ]);

  return (
    <div className="basic-card-no-p w-full rounded-md border shadow-md">
      <div className="flex items-center justify-between p-4 text-white">
        <h1 className="text-lg font-medium">All Teachers</h1>

        <div className="flex gap-2">
          {selectedTeachers.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setIsBulkDeleteDialogOpen(true)}
              className="mr-2"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Selected
            </Button>
          )}
          <Dialog
            open={isAddDialogOpen}
            onOpenChange={(open) => {
              setIsAddDialogOpen(open);
              if (!open) addTeacherForm.reset();
            }}
          >
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="basic-title-sm hover:bg-gray-100"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Add new Teacher
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Teacher</DialogTitle>
              </DialogHeader>
              <Form {...addTeacherForm}>
                <form
                  onSubmit={addTeacherForm.handleSubmit(handleAddTeacher)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <CommonFormField
                      control={addTeacherForm.control}
                      name="name"
                      label="Full Name"
                      placeholder="Enter teacher name"
                    />
                    <CommonFormField
                      control={addTeacherForm.control}
                      name="email"
                      label="Email"
                      type="email"
                      placeholder="Enter email address"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <CommonFormField
                      control={addTeacherForm.control}
                      name="gender"
                      label="Gender"
                      fieldType="select"
                      placeholder="Select gender"
                      selectOptions={[
                        { value: "Male", label: "Male" },
                        { value: "Female", label: "Female" },
                      ]}
                    />
                    <CommonFormField
                      control={addTeacherForm.control}
                      name="phone"
                      label="Phone Number"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <CommonFormField
                      control={addTeacherForm.control}
                      name="experience"
                      label="Experience (Years)"
                      type="number"
                      placeholder="Enter years of experience"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <CommonFormField
                      control={addTeacherForm.control}
                      name="classes"
                      label="Classes"
                      fieldType="custom"
                      render={({ field }) => {
                        const selected = (field.value ?? []) as string[];
                        return (
                        <div className="space-y-2">
                          <Select
                            onValueChange={(value) => {
                              const currentValues = selected;
                              if (currentValues.includes(value)) {
                                field.onChange(
                                  currentValues.filter((v) => v !== value),
                                );
                              } else {
                                field.onChange([...currentValues, value]);
                              }
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select classes">
                                {selected.length > 0
                                  ? `${selected.length} class${
                                      selected.length > 1 ? "es" : ""
                                    } selected`
                                  : "Select classes"}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {availableClasses.map((cls) => (
                                <SelectItem key={cls} value={cls}>
                                  <div className="flex items-center gap-2">
                                    <Checkbox
                                      checked={selected.includes(cls)}
                                    />
                                    <span>{cls}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {selected.map((cls) => (
                              <Badge
                                key={cls}
                                variant="outline"
                                className="bg-slate-700"
                              >
                                {cls}
                                <button
                                  type="button"
                                  className="ring-offset-background focus:ring-ring ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
                                  onClick={() => {
                                    field.onChange(
                                      selected.filter(
                                        (value) => value !== cls,
                                      ),
                                    );
                                  }}
                                >
                                  ×
                                </button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                        );
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <CommonFormField
                      control={addTeacherForm.control}
                      name="subjects"
                      label="Subjects"
                      fieldType="custom"
                      render={({ field }) => {
                        const selected = (field.value ?? []) as string[];
                        return (
                        <div className="space-y-2">
                          <Select
                            onValueChange={(value) => {
                              const currentValues = selected;
                              if (currentValues.includes(value)) {
                                field.onChange(
                                  currentValues.filter((v) => v !== value),
                                );
                              } else {
                                field.onChange([...currentValues, value]);
                              }
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select subjects">
                                {selected.length > 0
                                  ? `${selected.length} subject${
                                      selected.length > 1 ? "s" : ""
                                    } selected`
                                  : "Select subjects"}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {availableSubjects.map((subject) => (
                                <SelectItem key={subject} value={subject}>
                                  <div className="flex items-center gap-2">
                                    <Checkbox
                                      checked={selected.includes(subject)}
                                    />
                                    <span>{subject}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {selected.map((subject) => (
                              <Badge
                                key={subject}
                                variant="outline"
                                className="bg-slate-700"
                              >
                                {subject}
                                <button
                                  type="button"
                                  className="ring-offset-background focus:ring-ring ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
                                  onClick={() => {
                                    field.onChange(
                                      selected.filter(
                                        (value) => value !== subject,
                                      ),
                                    );
                                  }}
                                >
                                  ×
                                </button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                        );
                      }}
                    />
                  </div>

                  <DialogFooter>
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => setIsAddDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Add Teacher</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Form {...filterForm}>
        <form
          onChange={filterForm.handleSubmit(applyFilters)}
          className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-4"
        >
          <CommonFormField
            control={filterForm.control}
            name="searchTerm"
            label={<span className="text-white">Search</span>}
            fieldType="custom"
            classname="space-y-2"
            render={({ field }) => (
              <div className="relative">
                <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
                <Input
                  {...field}
                  placeholder="Search by name or email"
                  className="w-full pl-8"
                  onChange={(e) => {
                    field.onChange(e);
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            )}
          />
          <CommonFormField
            control={filterForm.control}
            name="genderFilter"
            label={<span className="text-white">Gender</span>}
            fieldType="custom"
            classname="space-y-2"
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setGenderFilter(value);
                  setCurrentPage(1);
                }}
                value={field.value}
              >
                <SelectTrigger id="gender-filter" className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent className="border-slate-700 bg-slate-800 text-white">
                  <SelectItem value="All gender">All gender</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <CommonFormField
            control={filterForm.control}
            name="classFilter"
            label={<span className="text-white">Class</span>}
            fieldType="custom"
            classname="space-y-2"
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setClassFilter(value);
                  setCurrentPage(1);
                }}
                value={field.value}
              >
                <SelectTrigger id="class-filter" className="w-full">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent className="border-slate-700 bg-slate-800 text-white">
                  <SelectItem value="All classes">All classes</SelectItem>
                  {availableClasses.map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <CommonFormField
            control={filterForm.control}
            name="subjectFilter"
            label={<span className="text-white">Subject</span>}
            fieldType="custom"
            classname="space-y-2"
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setSubjectFilter(value);
                  setCurrentPage(1);
                }}
                value={field.value}
              >
                <SelectTrigger id="subject-filter" className="w-full">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent className="border-slate-700 bg-slate-800 text-white">
                  <SelectItem value="All subjects">All subjects</SelectItem>
                  {availableSubjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <div className="space-y-2">
            <Label htmlFor="experience-filter" className="text-white">
              Experience Range (Years)
            </Label>
            <div className="flex gap-2">
              <CommonFormField
                control={filterForm.control}
                name="minExperience"
                label={<span className="sr-only">Minimum years</span>}
                fieldType="custom"
                classname="w-full"
                render={({ field }) => (
                  <Input
                    {...field}
                    id="min-experience"
                    placeholder="Min"
                    type="number"
                    onChange={(e) => {
                      field.onChange(e);
                      setMinExperience(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                )}
              />
              <CommonFormField
                control={filterForm.control}
                name="maxExperience"
                label={<span className="sr-only">Maximum years</span>}
                fieldType="custom"
                classname="w-full"
                render={({ field }) => (
                  <Input
                    {...field}
                    id="max-experience"
                    placeholder="Max"
                    type="number"
                    onChange={(e) => {
                      field.onChange(e);
                      setMaxExperience(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                )}
              />
            </div>
          </div>
        </form>
      </Form>

      <Table>
        <TableHeader className="text-white">
          <TableRow className="border-none">
            <TableHead className="w-[50px]">
              <Checkbox
                checked={
                  currentTeachers.length > 0 &&
                  selectedTeachers.length === currentTeachers.length
                }
                onCheckedChange={toggleAllTeachers}
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Classes</TableHead>
            <TableHead>Subjects</TableHead>
            <TableHead>Phone number</TableHead>
            <TableHead className="w-[50px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentTeachers.length > 0 ? (
            currentTeachers.map((teacher) => (
              <TableRow
                key={teacher.id}
                className="border-t border-slate-400 text-white"
              >
                <TableCell className="p-2">
                  <Checkbox
                    checked={selectedTeachers.includes(teacher.id)}
                    onCheckedChange={() => toggleTeacher(teacher.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <MyImage
                      className="size-10"
                      src={teacher.image || "/placeholder.svg"}
                      role="AVATAR"
                      alt={teacher.name}
                    />
                    <div>
                      <div className="font-medium">{teacher.name}</div>
                      <span className="text-muted-foreground mt-0.5 text-xs">
                        {teacher.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{teacher.gender}</TableCell>
                <TableCell>{teacher.experience}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {teacher.classes.map((cls) => (
                      <Badge
                        key={cls}
                        variant="outline"
                        className="bg-slate-700"
                      >
                        {cls}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {teacher.subjects.map((subject) => (
                      <Badge
                        key={subject}
                        variant="outline"
                        className="bg-slate-700"
                      >
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{teacher.phone}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-slate-500"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="border-slate-700 bg-slate-800 text-white"
                    >
                      <DropdownMenuItem
                        className="hover:bg-slate-700 focus:bg-slate-700"
                        onSelect={(e) => {
                          e.preventDefault();
                          prepareTeacherForEdit(teacher);
                        }}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-500 hover:bg-slate-700 focus:bg-slate-700"
                        onSelect={(e) => {
                          e.preventDefault();
                          setTeacherToDelete(teacher.id);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="py-4 text-center text-white">
                No teachers found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between p-4 text-white">
        <div>
          {filteredTeachers.length > 0 && (
            <p>
              Showing {indexOfFirstTeacher + 1} to{" "}
              {Math.min(indexOfLastTeacher, filteredTeachers.length)} of{" "}
              {filteredTeachers.length} teachers
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="basic-title-sm bg-white hover:bg-gray-100"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            className="basic-title-sm bg-white hover:bg-gray-100"
            onClick={goToNextPage}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Edit Teacher Dialog */}
      <Dialog
        open={isEditDialogOpen}
        onOpenChange={(open) => {
          setIsEditDialogOpen(open);
          if (!open) editTeacherForm.reset();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Teacher</DialogTitle>
          </DialogHeader>
          <Form {...editTeacherForm}>
            <form
              onSubmit={editTeacherForm.handleSubmit(handleEditTeacher)}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <CommonFormField
                  control={editTeacherForm.control}
                  name="name"
                  label="Full Name"
                  placeholder="Enter teacher name"
                />
                <CommonFormField
                  control={editTeacherForm.control}
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Enter email address"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <CommonFormField
                  control={editTeacherForm.control}
                  name="gender"
                  label="Gender"
                  fieldType="select"
                  placeholder="Select gender"
                  selectOptions={[
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                  ]}
                />
                <CommonFormField
                  control={editTeacherForm.control}
                  name="phone"
                  label="Phone Number"
                  placeholder="Enter phone number"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <CommonFormField
                  control={editTeacherForm.control}
                  name="experience"
                  label="Experience (Years)"
                  type="number"
                  placeholder="Enter years of experience"
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <CommonFormField
                  control={editTeacherForm.control}
                  name="classes"
                  label="Classes"
                  fieldType="custom"
                  render={({ field }) => {
                    const selected = (field.value ?? []) as string[];
                    return (
                    <div className="space-y-2">
                      <Select
                        onValueChange={(value) => {
                          const currentValues = selected;
                          if (currentValues.includes(value)) {
                            field.onChange(
                              currentValues.filter((v) => v !== value),
                            );
                          } else {
                            field.onChange([...currentValues, value]);
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select classes">
                            {selected.length > 0
                              ? `${selected.length} class${
                                  selected.length > 1 ? "es" : ""
                                } selected`
                              : "Select classes"}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent className="border-slate-700 bg-slate-800 text-white">
                          {availableClasses.map((cls) => (
                            <SelectItem key={cls} value={cls}>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  checked={selected.includes(cls)}
                                />
                                <span>{cls}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {selected.map((cls) => (
                          <Badge
                            key={cls}
                            variant="outline"
                            className="bg-slate-700"
                          >
                            {cls}
                            <button
                              type="button"
                              className="ring-offset-background focus:ring-ring ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
                              onClick={() => {
                                field.onChange(
                                  selected.filter((value) => value !== cls),
                                );
                              }}
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                    );
                  }}
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <CommonFormField
                  control={editTeacherForm.control}
                  name="subjects"
                  label="Subjects"
                  fieldType="custom"
                  render={({ field }) => {
                    const selected = (field.value ?? []) as string[];
                    return (
                    <div className="space-y-2">
                      <Select
                        onValueChange={(value) => {
                          const currentValues = selected;
                          if (currentValues.includes(value)) {
                            field.onChange(
                              currentValues.filter((v) => v !== value),
                            );
                          } else {
                            field.onChange([...currentValues, value]);
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select subjects">
                            {selected.length > 0
                              ? `${selected.length} subject${
                                  selected.length > 1 ? "s" : ""
                                } selected`
                              : "Select subjects"}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent className="border-slate-700 bg-slate-800 text-white">
                          {availableSubjects.map((subject) => (
                            <SelectItem key={subject} value={subject}>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  checked={selected.includes(subject)}
                                />
                                <span>{subject}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {selected.map((subject) => (
                          <Badge
                            key={subject}
                            variant="outline"
                            className="bg-slate-700"
                          >
                            {subject}
                            <button
                              type="button"
                              className="ring-offset-background focus:ring-ring ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
                              onClick={() => {
                                field.onChange(
                                  selected.filter(
                                    (value) => value !== subject,
                                  ),
                                );
                              }}
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                    );
                  }}
                />
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="border-slate-700 bg-slate-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-300">
              Are you sure you want to delete this teacher? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 text-white hover:bg-slate-600">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={() => {
                if (teacherToDelete) {
                  handleDeleteTeacher(teacherToDelete);
                }
                setIsDeleteDialogOpen(false);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Delete Confirmation Dialog */}
      <AlertDialog
        open={isBulkDeleteDialogOpen}
        onOpenChange={setIsBulkDeleteDialogOpen}
      >
        <AlertDialogContent className="border-slate-700 bg-slate-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Bulk Deletion</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-300">
              Are you sure you want to delete {selectedTeachers.length} selected
              teachers? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 text-white hover:bg-slate-600">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={handleBulkDelete}
            >
              Delete All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
