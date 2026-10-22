import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { create as usersCreate, index as usersIndex } from "@/routes/users";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
};

type PaginatedUsers = {
    data: User[];
    current_page: number;
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
    total: number;
};

interface Props {
    users: PaginatedUsers;
    filters: {
        search: string | null;
    };
}

export default function Index({ users, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? "");

    const visitPage = (url: string | null) => {
        if (!url) {
            return;
        }

        router.visit(url, {
            preserveScroll: true,
            preserveState: true,
        });
    };
    return (
        <>
            <Head title="User Management" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <div className="my-4">
                        <h1 className="text-2xl font-bold">Daftar User</h1>
                    </div>
                    <div className="my-4">
                        <p>Total User: {users.total}</p>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                        <Input
                            className="w-full max-w-sm"
                            value={search}
                            placeholder="Cari User..."
                            onChange={(event) => {
                                const value = event.target.value;

                                setSearch(value);

                                router.get(
                                    usersIndex().url,
                                    {
                                        search: value,
                                    },
                                    {
                                        preserveState: true,
                                        replace: true,
                                    },
                                );
                            }}
                        />

                        <Button
                            render={<Link href={usersCreate().url} />}
                            nativeButton={false}
                        >
                            Tambah User
                        </Button>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.data.length > 0 ? (
                                users.data.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Badge>{user.role}</Badge>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="h-24 text-center text-muted-foreground"
                                    >
                                        User tidak ditemukan.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    <div className="flex items-center justify-between gap-4 border-t pt-4">
                        <p className="text-sm text-muted-foreground">
                            Halaman {users.current_page} dari {users.last_page}
                        </p>

                        <div className="flex items-center gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                disabled={!users.prev_page_url}
                                onClick={() => visitPage(users.prev_page_url)}
                            >
                                Previous
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                disabled={!users.next_page_url}
                                onClick={() => visitPage(users.next_page_url)}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: "User Management",
            href: usersIndex().url,
        },
    ],
};
