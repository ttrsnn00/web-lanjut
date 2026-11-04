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
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    create as usersCreate,
    destroy as usersDestroy,
    edit as usersEdit,
    index as usersIndex,
} from "@/routes/users";
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
    const [deletingUser, setDeletingUser] = useState<User | null>(null);

    const visitPage = (url: string | null) => {
        if (!url) {
            return;
        }

        router.visit(url, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const handleDelete = () => {
        if (!deletingUser) return;

        router.delete(usersDestroy({ user: deletingUser.id }).url, {
            preserveScroll: true,
            onSuccess: () => setDeletingUser(null),
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
                                <TableHead className="text-right">
                                    Aksi
                                </TableHead>
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
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    render={
                                                        <Link
                                                            href={
                                                                usersEdit({
                                                                    user: user.id,
                                                                }).url
                                                            }
                                                        />
                                                    }
                                                    nativeButton={false}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() =>
                                                        setDeletingUser(user)
                                                    }
                                                >
                                                    Hapus
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
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

            {/* Dialog Konfirmasi Hapus */}
            <AlertDialog
                open={!!deletingUser}
                onOpenChange={(open) => !open && setDeletingUser(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Konfirmasi Hapus User
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus user{" "}
                            <strong>{deletingUser?.name}</strong>? Tindakan ini
                            tidak dapat dibatalkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Ya, Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
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
