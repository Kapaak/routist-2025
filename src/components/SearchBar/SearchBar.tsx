"use client";

import NextLink from "next/link";

import { useState } from "react";
import { redirectToLocation } from "~/actions";

import { AutocompleteOption } from "~/domains";

import { Button } from "~/ui/components/atoms";
import { Autocomplete } from "../Autocomplete";

interface SearchBarProps {
  options: AutocompleteOption[];
  placeholder?: string;
  baseRoute?: string;
}

export const SearchBar = ({
  options,
  placeholder,
  baseRoute = "/",
}: SearchBarProps) => {
  const [selectedLocation, setSelectedLocation] = useState("");

  const isValidLocation = selectedLocation.length > 0;

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
  };

  const redirectPathWithBaseRoute = redirectToLocation.bind(
    null,
    `${baseRoute}/${selectedLocation}`
  );

  return (
    <form action={redirectPathWithBaseRoute}>
      <div className="flex gap-3 rounded-md bg-white px-4 py-2 shadow-regular">
        <Autocomplete
          placeholder={placeholder}
          options={options}
          onSelect={handleLocationSelect}
        />
        <NextLink
          href={isValidLocation ? `${baseRoute}/${selectedLocation}` : "/"}
        >
          <Button color="secondary">Najít</Button>
        </NextLink>
      </div>
    </form>
  );
};
