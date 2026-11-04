import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { index as usersIndex, update as usersUpdate } from "@/routes/users";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEvent } from "react";

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
};

interface Props {
    user: User;
}

export default function Edit({ user }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: "",
        role: user.role,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(usersUpdate({ user: user.id }).url);
    };

    return (
        <>
            <Head title={`Edit User - ${user.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="max-w-2xl">
                    <div className="my-4">
                        <h1 className="text-2xl font-bold">Edit User</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="name"
                                className="text-sm font-medium"
                            >
                                Nama
                            </label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                placeholder="Masukkan nama user"
                            />
                            {errors.name && (
                                <p className="text-sm text-destructive">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium"
                            >
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                placeholder="Masukkan email user"
                            />
                            {errors.email && (
                                <p className="text-sm text-destructive">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="password"
                                className="text-sm font-medium"
                            >
                                Password{" "}
                                <span className="text-xs text-muted-foreground">
                                    (Opsional)
                                </span>
                            </label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                placeholder="Kosongkan jika tidak ingin mengubah password"
                            />
                            {errors.password && (
                                <p className="text-sm text-destructive">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="role"
                                className="text-sm font-medium"
                            >
                                Role
                            </label>
                            <Select
                                value={data.role}
                                onValueChange={(value) =>
                                    setData("role", value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="manager">
                                        Manager
                                    </SelectItem>
                                    <SelectItem value="user">User</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.role && (
                                <p className="text-sm text-destructive">
                                    {errors.role}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center gap-2 pt-4">
                            <Button type="submit" disabled={processing}>
                                {processing
                                    ? "Menyimpan..."
                                    : "Simpan Perubahan"}
                            </Button>
                            <Button
                                variant="outline"
                                render={<Link href={usersIndex().url} />}
                                nativeButton={false}
                            >
                                Batal
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

Edit.layout = {
    breadcrumbs: [
        {
            title: "User Management",
            href: usersIndex().url,
        },
        {
            title: "Edit User",
            href: "#",
        },
    ],
};
