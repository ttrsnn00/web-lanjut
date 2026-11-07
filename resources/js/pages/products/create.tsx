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
import { Head, Link, useForm } from "@inertiajs/react";
import type { FormEvent } from "react";

export default function Create() {
    const form = useForm({
        name: "",
        category: "Tanaman Hias",
        price: "",
        stock: "",
        description: "",
        image: null as File | null,
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        form.post("/products");
    };

    return (
        <>
            <Head title="Tambah Produk Tanaman" />

            <div className="flex h-full flex-1 flex-col p-4">
                <Card className="w-full max-w-2xl">
                    <CardHeader>
                        <CardTitle>Tambah Produk Tanaman</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form className="grid gap-6" onSubmit={submit}>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Nama Tanaman</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={form.data.name}
                                    onChange={(event) =>
                                        form.setData("name", event.target.value)
                                    }
                                    placeholder="Masukkan nama tanaman"
                                    required
                                />
                                <InputError message={form.errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="category">Kategori</Label>
                                <Select
                                    value={form.data.category}
                                    onValueChange={(value) =>
                                        form.setData("category", value)
                                    }
                                >
                                    <SelectTrigger
                                        id="category"
                                        className="w-full"
                                    >
                                        <SelectValue placeholder="Pilih kategori" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Tanaman Hias">
                                            Tanaman Hias
                                        </SelectItem>
                                        <SelectItem value="Sukulen & Kaktus">
                                            Sukulen & Kaktus
                                        </SelectItem>
                                        <SelectItem value="Bonsai">
                                            Bonsai
                                        </SelectItem>
                                        <SelectItem value="Herba & Bumbu">
                                            Herba & Bumbu
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={form.errors.category} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="price">Harga (Rp)</Label>
                                    <Input
                                        id="price"
                                        name="price"
                                        type="number"
                                        min="0"
                                        value={form.data.price}
                                        onChange={(event) =>
                                            form.setData(
                                                "price",
                                                event.target.value,
                                            )
                                        }
                                        placeholder="Masukkan harga"
                                        required
                                    />
                                    <InputError message={form.errors.price} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="stock">Stok</Label>
                                    <Input
                                        id="stock"
                                        name="stock"
                                        type="number"
                                        min="0"
                                        value={form.data.stock}
                                        onChange={(event) =>
                                            form.setData(
                                                "stock",
                                                event.target.value,
                                            )
                                        }
                                        placeholder="Masukkan stok"
                                        required
                                    />
                                    <InputError message={form.errors.stock} />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Deskripsi</Label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    rows={3}
                                    value={form.data.description}
                                    onChange={(event) =>
                                        form.setData(
                                            "description",
                                            event.target.value,
                                        )
                                    }
                                    placeholder="Masukkan deskripsi tanaman"
                                />
                                <InputError message={form.errors.description} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="image">Foto Produk</Label>
                                <Input
                                    id="image"
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) =>
                                        form.setData(
                                            "image",
                                            event.target.files
                                                ? event.target.files[0]
                                                : null,
                                        )
                                    }
                                />
                                <InputError message={form.errors.image} />
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
                                <Button
                                    variant="outline"
                                    render={<Link href="/products" />}
                                    nativeButton={false}
                                >
                                    Batal
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
            title: "Produk Tanaman",
            href: "/products",
        },
        {
            title: "Tambah Produk",
            href: "/products/create",
        },
    ],
};
