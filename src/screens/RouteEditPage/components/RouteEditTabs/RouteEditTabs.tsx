"use client";

import { Tab, TabGroup, TabList } from "@headlessui/react";
import { Fragment, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "~/ui/components/atoms";

export function RouteEditTabs({ children }: PropsWithChildren) {
  return (
    <TabGroup className="w-full h-full">
      <TabList className="flex">
        <Tab as={Fragment}>
          {({ hover, selected }) => (
            <Button
              className={twMerge(
                "normal-case text-grey-600  transform translate-y-[.2rem]",
                selected && ["text-dark-blue", "border-b-2 border-dark-blue"]
              )}
              variant="plain"
            >
              Obecné
            </Button>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ hover, selected }) => (
            <Button
              className={twMerge(
                "normal-case text-grey-600 transform translate-y-[.2rem]",
                selected && ["text-dark-blue", "border-b-2 border-dark-blue"]
              )}
              variant="plain"
            >
              Trasa
            </Button>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ hover, selected }) => (
            <Button
              className={twMerge(
                "normal-case text-grey-600 transform translate-y-[.2rem]",
                selected && ["text-dark-blue", "border-b-2 border-dark-blue"]
              )}
              variant="plain"
            >
              Viditelnost
            </Button>
          )}
        </Tab>
      </TabList>
      {children}
    </TabGroup>
  );
}
