import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    create as usersCreate,
    index as usersIndex,
    store as usersStore,
} from "@/routes/users";
import { Head, Link, useForm } from "@inertiajs/react";
import type { FormEvent } from "react";

export default function Create() {
    const form = useForm({
        name: "",
        email: "",
        password: "",
        role: "user",
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        form.submit(usersStore());
    };

    return (
        <>
            <Head title="Tambah User" />

            <div className="flex h-full flex-1 flex-col p-4">
                <Card className="w-full max-w-2xl">
                    <CardHeader>
                        <CardTitle>Tambah User</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form className="grid gap-6" onSubmit={submit}>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Nama</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={form.data.name}
                                    onChange={(event) =>
                                        form.setData("name", event.target.value)
                                    }
                                    autoComplete="name"
                                    placeholder="Masukkan nama"
                                    required
                                />
                                <InputError message={form.errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={form.data.email}
                                    onChange={(event) =>
                                        form.setData(
                                            "email",
                                            event.target.value,
                                        )
                                    }
                                    autoComplete="email"
                                    placeholder="Masukkan email"
                                    required
                                />
                                <InputError message={form.errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={form.data.password}
                                    onChange={(event) =>
                                        form.setData(
                                            "password",
                                            event.target.value,
                                        )
                                    }
                                    autoComplete="new-password"
                                    placeholder="Masukkan password"
                                    required
                                />
                                <InputError message={form.errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="role">Role</Label>
                                <Select
                                    value={form.data.role}
                                    onValueChange={(value) =>
                                        form.setData("role", value)
                                    }
                                >
                                    <SelectTrigger id="role" className="w-full">
                                        <SelectValue placeholder="Pilih role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">
                                            Admin
                                        </SelectItem>
                                        <SelectItem value="manager">
                                            Manager
                                        </SelectItem>
                                        <SelectItem value="user">
                                            User
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={form.errors.role} />
                            </div>

                            <div className="flex items-center gap-3">
                                <Button
                                    type="submit"
                                    disabled={form.processing}
                                >
                                    {form.processing
                                        ? "Menyimpan..."
                                        : "Simpan"}
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href={usersIndex().url}>Batal</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        {
            title: "User Management",
            href: usersIndex().url,
        },
        {
            title: "Tambah User",
            href: usersCreate().url,
        },
    ],
};
