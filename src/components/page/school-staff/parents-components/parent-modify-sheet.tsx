"use client";

import MyAvatar from "@/components/common/image/my-avatar";
import MyLink, { LoadingIndicatorText } from "@/components/common/myLink";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import NotFoundImage from "@/components/common/image/not-found-image";
import { OpenImages } from "@/components/common/image/open-images";
import ParentDialog from "@/components/page/parent/dialogs/parent-dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { Locale } from "@/i18n";
import { splitCamelCase } from "@/lib/helpers/format-text";
import type { ParentWithRelations } from "@/lib/schema/relations-schema";
import { cn } from "@/lib/utils";
import type { AuthContext } from "@/lib/utils/auth-context";

interface Props {
  parent: Pa