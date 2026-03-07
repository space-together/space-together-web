"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCallback, useEffect, useState } from "react";

export interface AuditFilters {
  severity?: string;
  entity_type?: string;
  action?: string;
  from_date?: string;
  to_date?: string;
  filter?: string;
}

interface AuditFilterProps {
  onFilterChange: (filters: AuditFilters) => void;
  initialFilters?: AuditFilters;
}

export function AuditFilter({
  onFilterChange,
  initialFilters = {},
}: AuditFilterProps) {
  const [filters, setFilters] = useState<AuditFilters>(initialFilters);
  const [searchTerm, setSearchTerm] = useState(initialFilters.filter || "");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== filters.filter) {
        const newFilters = { ...filters, filter: searchTerm || undefined };
        setFilters(newFilters);
        onFilterChange(newFilters);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleChange = useCallback(
    (key: keyof AuditFilters, value: string) => {
      const newFilters = { ...filters, [key]: value || undefined };
      setFilters(newFilters);
      onFilterChange(newFilters);
    },
    [filters, onFilterChange],
  );

  const handleReset = () => {
    setFilters({});
    setSearchTerm("");
    onFilterChange({});
  };

  return (
    <div className="space-y-4 bg-base-100 rounded-lg border border-base-300 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Filters</h3>
        <Button
          library="daisy"
          size="xs"
          variant="ghost"
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search" className="text-sm">
            Search
          </Label>
          <Input
            id="search"
            placeholder="Search user, action..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Severity */}
        <div className="space-y-2">
          <Label htmlFor="severity" className="text-sm">
            Severity
          </Label>
          <Select
            value={filters.severity || "all"}
            onValueChange={(value) =>
              handleChange("severity", value === "all" ? "" : value)
            }
          >
            <SelectTrigger id="severity">
              <SelectValue placeholder="All Severities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="INFO">Info</SelectItem>
              <SelectItem value="WARNING">Warning</SelectItem>
              <SelectItem value="CRITICAL">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Entity Type */}
        <div className="space-y-2">
          <Label htmlFor="entity_type" className="text-sm">
            Entity Type
          </Label>
          <Select
            value={filters.entity_type || "all"}
            onValueChange={(value) =>
              handleChange("entity_type", value === "all" ? "" : value)
            }
          >
            <SelectTrigger id="entity_type">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="teacher">Teacher</SelectItem>
              <SelectItem value="submission">Submission</SelectItem>
              <SelectItem value="assignment">Assignment</SelectItem>
              <SelectItem value="attendance">Attendance</SelectItem>
              <SelectItem value="transaction">Transaction</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="role">Role</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* From Date */}
        <div className="space-y-2">
          <Label htmlFor="from_date" className="text-sm">
            From Date
          </Label>
          <Input
            id="from_date"
            type="date"
            value={filters.from_date || ""}
            onChange={(e) => handleChange("from_date", e.target.value)}
          />
        </div>

        {/* To Date */}
        <div className="space-y-2">
          <Label htmlFor="to_date" className="text-sm">
            To Date
          </Label>
          <Input
            id="to_date"
            type="date"
            value={filters.to_date || ""}
            onChange={(e) => handleChange("to_date", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
