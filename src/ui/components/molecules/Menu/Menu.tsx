import {
  Menu as HeadlessUIMenu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Button, ButtonProps } from "../../atoms/Button";
import { Fragment } from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type Option = {
  label?: string;
  href?: string;
  onClick?: () => void;
};

interface MenuProps {
  actionButtonProps?: ButtonProps;
  label?: string;
  options?: Option[];
}

export function Menu({ label, options, actionButtonProps }: MenuProps) {
  return (
    <HeadlessUIMenu as="div" className="relative z-50 inline-block text-left">
      <div>
        <MenuButton as={Button} {...actionButtonProps}>
          {label}
        </MenuButton>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            {options?.map((option) => (
              <MenuItem key={option?.href}>
                {({ focus }) =>
                  option?.href ? (
                    <Link
                      href={option?.href}
                      className={twMerge(
                        "group flex w-full items-center rounded-md px-2 py-2 text-sm",
                        focus
                          ? "bg-light-orange text-main-orange"
                          : "text-black"
                      )}
                    >
                      {option?.label}
                    </Link>
                  ) : (
                    <button
                      className={twMerge(
                        "group flex w-full items-center rounded-md px-2 py-2 text-sm",
                        focus
                          ? "bg-light-orange text-main-orange"
                          : "text-black"
                      )}
                      onClick={option?.onClick}
                    >
                      {option?.label}
                    </button>
                  )
                }
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </HeadlessUIMenu>
  );
}
