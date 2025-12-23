"use client";
import type { address } from "@/lib/schema/common-details-schema";
import Link from "next/link";
import { BsMap } from "react-icons/bs";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface AddressCardProps {
  address: address;
}

const AddressCard = ({ address }: AddressCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Address</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          <li className=" flex gap-4">
            <p>Count:</p>
            <span className="font-medium">{address.country}</span>
          </li>
          <li className=" flex gap-4">
            <p>Province:</p>
            <span className="font-medium">{address.province}</span>
          </li>
          <li className=" flex gap-4">
            <p>District:</p>
            <span className="font-medium">{address.district}</span>
          </li>
          {address.sector && (
            <li className=" flex gap-4">
              <p>Sector:</p>
              <span className="font-medium">{address.sector}</span>
            </li>
          )}
          {address.cell && (
            <li className=" flex gap-4">
              <p>Cell:</p>
              <span className="font-medium">{address.cell}</span>
            </li>
          )}
          {address.village && (
            <li className=" flex gap-4">
              <p>Village:</p>
              <span className="font-medium">{address.village}</span>
            </li>
          )}
          {address.state && (
            <li className=" flex gap-4">
              <p>State:</p>
              <span className="font-medium">{address.state}</span>
            </li>
          )}
          {address.street && (
            <li className=" flex gap-4">
              <p>Street:</p>
              <span className="font-medium">{address.street}</span>
            </li>
          )}
          {address.street && (
            <li className=" flex gap-4">
              <p>Street:</p>
              <span className="font-medium">{address.street}</span>
            </li>
          )}
          {address.city && (
            <li className=" flex gap-4">
              <p>City:</p>
              <span className="font-medium">{address.city}</span>
            </li>
          )}
          {address.postal_code && (
            <li className=" flex gap-4">
              <p>Postal code:</p>
              <span className="font-medium">{address.postal_code}</span>
            </li>
          )}
          {address.google_map_url && (
            <li className=" flex gap-4">
              <p>Google map:</p>
              <Link
                href={address.google_map_url}
                target="_blank"
                className="font-medium flex items-center gap-2"
              >
                <BsMap className=" text-accent" /> <span>Map</span>
              </Link>
            </li>
          )}
        </ul>
      </CardContent>
    </Card>
  );
};

export default AddressCard;
