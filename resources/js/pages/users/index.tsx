import { Head, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { dashboard } from "@/routes";
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

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
    e_url?: string;
    d_url?: string;
};

interface Props {
    users: {
        data: User[];
        current_page: number;
        last_page: number;
        prev_page_url: string | null;
        next_page_url: string | null;
    };
    filter?: {
        search?: string | null;
    };
    c_url: string;
    totalUsers: number;
}

export default function UserIndex({ users, filter, c_url, totalUsers }: Props) {
    const [search, setSearch] = useState(filter?.search ?? "");

    useEffect(() => {
        if (search === (filter?.search ?? "")) return;

        const timer = setTimeout(() => {
            router.get(
                c_url,
                { search },
                { preserveState: true, replace: true },
            );
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    return (
        <>
            <Head title="Users Management" />
            <div className="p-4">
                <h1 className="mb-2 text-xl font-bold">Daftar User</h1>
                <p className="mb-4 text-sm text-muted-foreground">
                    Total User: {totalUsers}
                </p>

                <Input
                    className="mb-4 max-w-sm"
                    placeholder="Cari user..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Nama</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.data.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Badge>{user.role}</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="mt-4 flex items-center gap-3">
                    <Button
                        variant="outline"
                        disabled={!users.prev_page_url}
                        onClick={() => router.visit(users.prev_page_url!)}
                    >
                        Previous
                    </Button>
                    <span className="text-sm">
                        Halaman {users.current_page} dari {users.last_page}
                    </span>
                    <Button
                        variant="outline"
                        disabled={!users.next_page_url}
                        onClick={() => router.visit(users.next_page_url!)}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </>
    );
}

UserIndex.layout = {
    breadcrumbs: [
        {
            title: "User Management",
            href: dashboard(),
        },
    ],
};