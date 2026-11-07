import { Link, router } from "@inertiajs/react";
import { LogOut, Settings } from "lucide-react";
import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { UserInfo } from "@/components/user-info";
import { useMobileNavigation } from "@/hooks/use-mobile-navigation";
import { logout } from "@/routes";
import { edit } from "@/routes/profile";
import type { User } from "@/types";

type Props = {
    user: User;
};

export function UserMenuContent({ user }: Props) {
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.post(logout());
    };

    return (
        <>
            {/* ✅ Fix 1: Bungkus DropdownMenuLabel ke dalam DropdownMenuGroup */}
            <DropdownMenuGroup>
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <UserInfo user={user} showEmail={true} />
                    </div>
                </DropdownMenuLabel>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            {/* Item Navigasi Settings */}
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link
                        className="flex w-full items-center gap-2 cursor-pointer"
                        href={edit()}
                        prefetch
                        onClick={cleanup}
                    >
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            {/* ✅ Fix 2: Gunakan event onSelect pada DropdownMenuItem tanpa Link as="button" */}
            <DropdownMenuItem
                className="flex w-full items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
                onSelect={handleLogout}
                data-test="logout-button"
            >
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
            </DropdownMenuItem>
        </>
    );
}
