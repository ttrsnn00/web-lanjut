import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEvent } from "react";

type Product = {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    description?: string | null;
    image?: string | null;
};

interface Props {
    product: Product;
}

export default function Edit({ product }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: product.name,
        category: product.category,
        price: product.price.toString(),
        stock: product.stock.toString(),
        description: product.description ?? "",
        image: null as File | null,
        _method: "PUT",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Menggunakan method POST dengan _method: "PUT" untuk mendukung upload file multipart/form-data
        post(`/products/${product.id}`);
    };

    return (
        <>
            <Head title={`Edit Tanaman - ${product.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="max-w-2xl">
                    <div className="my-4">
                        <h1 className="text-2xl font-bold">
                            Edit Produk Tanaman
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="name"
                                className="text-sm font-medium"
                            >
                                Nama Tanaman
                            </label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                placeholder="Masukkan nama tanaman"
                            />
                            {errors.name && (
                                <p className="text-sm text-destructive">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="category"
                                className="text-sm font-medium"
                            >
                                Kategori
                            </label>
                            <Select
                                value={data.category}
                                onValueChange={(value) =>
                                    setData("category", value)
                                }
                            >
                                <SelectTrigger>
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
                            {errors.category && (
                                <p className="text-sm text-destructive">
                                    {errors.category}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="price"
                                    className="text-sm font-medium"
                                >
                                    Harga (Rp)
                                </label>
                                <Input
                                    id="price"
                                    type="number"
                                    min="0"
                                    value={data.price}
                                    onChange={(e) =>
                                        setData("price", e.target.value)
                                    }
                                    placeholder="Masukkan harga"
                                />
                                {errors.price && (
                                    <p className="text-sm text-destructive">
                                        {errors.price}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="stock"
                                    className="text-sm font-medium"
                                >
                                    Stok
                                </label>
                                <Input
                                    id="stock"
                                    type="number"
                                    min="0"
                                    value={data.stock}
                                    onChange={(e) =>
                                        setData("stock", e.target.value)
                                    }
                                    placeholder="Masukkan stok"
                                />
                                {errors.stock && (
                                    <p className="text-sm text-destructive">
                                        {errors.stock}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="description"
                                className="text-sm font-medium"
                            >
                                Deskripsi{" "}
                                <span className="text-xs text-muted-foreground">
                                    (Opsional)
                                </span>
                            </label>
                            <textarea
                                id="description"
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                rows={3}
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                placeholder="Masukkan deskripsi tanaman"
                            />
                            {errors.description && (
                                <p className="text-sm text-destructive">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="image"
                                className="text-sm font-medium"
                            >
                                Foto Produk{" "}
                                <span className="text-xs text-muted-foreground">
                                    (Opsional)
                                </span>
                            </label>
                            {product.image && (
                                <div className="flex items-center gap-3 my-1">
                                    <img
                                        src={`/storage/${product.image}`}
                                        alt={product.name}
                                        className="h-16 w-16 rounded-md object-cover border"
                                    />
                                    <span className="text-xs text-muted-foreground">
                                        Foto saat ini. Upload file baru jika
                                        ingin mengganti.
                                    </span>
                                </div>
                            )}
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setData(
                                        "image",
                                        e.target.files
                                            ? e.target.files[0]
                                            : null,
                                    )
                                }
                            />
                            {errors.image && (
                                <p className="text-sm text-destructive">
                                    {errors.image}
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
                                render={<Link href="/products" />}
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
            title: "Produk Tanaman",
            href: "/products",
        },
        {
            title: "Edit Tanaman",
            href: "#",
        },
    ],
};
