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
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

type Product = {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    description?: string | null;
    image?: string | null;
};

type PaginatedProducts = {
    data: Product[];
    current_page: number;
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
    total: number;
};

interface Props {
    products: PaginatedProducts;
    filters: {
        search: string | null;
    };
}

export default function Index({ products, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? "");
    const [deletingProduct, setDeletingProduct] = useState<Product | null>(
        null,
    );

    const visitPage = (url: string | null) => {
        if (!url) return;

        router.visit(url, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const handleDelete = () => {
        if (!deletingProduct) return;

        router.delete(`/products/${deletingProduct.id}`, {
            preserveScroll: true,
            onSuccess: () => setDeletingProduct(null),
        });
    };

    const formatRupiah = (price: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <>
            <Head title="Manajemen Produk Tanaman" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <div className="my-4">
                        <h1 className="text-2xl font-bold">
                            Daftar Produk Tanaman
                        </h1>
                    </div>
                    <div className="my-4">
                        <p>Total Produk: {products.total}</p>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                        <Input
                            className="w-full max-w-sm"
                            value={search}
                            placeholder="Cari Tanaman..."
                            onChange={(event) => {
                                const value = event.target.value;

                                setSearch(value);

                                router.get(
                                    "/products",
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
                            render={<Link href="/products/create" />}
                            nativeButton={false}
                        >
                            Tambah Tanaman
                        </Button>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Gambar</TableHead>
                                <TableHead>Nama Tanaman</TableHead>
                                <TableHead>Kategori</TableHead>
                                <TableHead>Harga</TableHead>
                                <TableHead>Stok</TableHead>
                                <TableHead className="text-right">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.data.length > 0 ? (
                                products.data.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>
                                            {product.image ? (
                                                <img
                                                    src={`/storage/${product.image}`}
                                                    alt={product.name}
                                                    className="h-12 w-12 rounded-md object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted text-[10px] text-muted-foreground">
                                                    No Image
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {product.name}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">
                                                {product.category}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {formatRupiah(product.price)}
                                        </TableCell>
                                        <TableCell>{product.stock}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    render={
                                                        <Link
                                                            href={`/products/${product.id}/edit`}
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
                                                        setDeletingProduct(
                                                            product,
                                                        )
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
                                        colSpan={6}
                                        className="h-24 text-center text-muted-foreground"
                                    >
                                        Produk tanaman tidak ditemukan.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    <div className="flex items-center justify-between gap-4 border-t pt-4">
                        <p className="text-sm text-muted-foreground">
                            Halaman {products.current_page} dari{" "}
                            {products.last_page}
                        </p>

                        <div className="flex items-center gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                disabled={!products.prev_page_url}
                                onClick={() =>
                                    visitPage(products.prev_page_url)
                                }
                            >
                                Previous
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                disabled={!products.next_page_url}
                                onClick={() =>
                                    visitPage(products.next_page_url)
                                }
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dialog Konfirmasi Hapus */}
            <AlertDialog
                open={!!deletingProduct}
                onOpenChange={(open) => !open && setDeletingProduct(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Konfirmasi Hapus Tanaman
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus produk tanaman{" "}
                            <strong>{deletingProduct?.name}</strong>? Tindakan
                            ini tidak dapat dibatalkan.
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
            title: "Produk Tanaman",
            href: "/products",
        },
    ],
};
