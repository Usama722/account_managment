import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Edit2, Trash2, Copy } from "lucide-react";
import { mockProducts, mockCategories, mockBrands } from "@/lib/mockData";
import { formatCurrency, formatDate, searchFilter, generateSKU } from "@/lib/utils";

export default function Products() {
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    categoryId: "",
    brandId: "",
    quantity: "",
    unitPrice: "",
  });

  const filteredProducts = useMemo(() => {
    return searchFilter(products, searchTerm, ["name", "sku"]);
  }, [products, searchTerm]);

  const handleGenerateSKU = () => {
    setFormData({ ...formData, sku: generateSKU() });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.sku ||
      !formData.categoryId ||
      !formData.brandId ||
      !formData.quantity ||
      !formData.unitPrice
    ) {
      alert("براہ کرم تمام فیلڈز بھریں");
      return;
    }

    if (editingId) {
      setProducts(
        products.map((prod) =>
          prod.id === editingId
            ? {
                ...prod,
                name: formData.name,
                sku: formData.sku,
                categoryId: parseInt(formData.categoryId),
                brandId: parseInt(formData.brandId),
                quantity: parseInt(formData.quantity),
                unitPrice: parseFloat(formData.unitPrice),
                updatedAt: new Date().toISOString(),
              }
            : prod
        )
      );
    } else {
      const newProduct = {
        id: Math.max(...products.map((p) => p.id), 0) + 1,
        name: formData.name,
        sku: formData.sku,
        categoryId: parseInt(formData.categoryId),
        brandId: parseInt(formData.brandId),
        quantity: parseInt(formData.quantity),
        unitPrice: parseFloat(formData.unitPrice),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setProducts([...products, newProduct]);
    }

    setFormData({
      name: "",
      sku: "",
      categoryId: "",
      brandId: "",
      quantity: "",
      unitPrice: "",
    });
    setEditingId(null);
    setIsOpen(false);
  };

  const handleEdit = (product: any) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      sku: product.sku,
      categoryId: product.categoryId.toString(),
      brandId: product.brandId.toString(),
      quantity: product.quantity.toString(),
      unitPrice: product.unitPrice.toString(),
    });
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("کیا آپ یقینی ہیں؟")) {
      setProducts(products.filter((prod) => prod.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">مصنوعات</h1>
          <p className="text-slate-600">اپنی مصنوعات اور اسٹاک منیج کریں</p>
        </div>

        {/* Search and Add */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <Input
              placeholder="تلاش کریں..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingId(null);
                  setFormData({
                    name: "",
                    sku: "",
                    categoryId: "",
                    brandId: "",
                    quantity: "",
                    unitPrice: "",
                  });
                }}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                نئی مصنوع
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "مصنوع میں ترمیم کریں" : "نئی مصنوع شامل کریں"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    مصنوع کا نام
                  </label>
                  <Input
                    placeholder="مصنوع کا نام درج کریں"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    SKU
                  </label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="SKU درج کریں یا جنریٹ کریں"
                      value={formData.sku}
                      onChange={(e) =>
                        setFormData({ ...formData, sku: e.target.value })
                      }
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleGenerateSKU}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    زمرہ
                  </label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) =>
                      setFormData({ ...formData, categoryId: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">زمرہ منتخب کریں</option>
                    {mockCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    برانڈ
                  </label>
                  <select
                    value={formData.brandId}
                    onChange={(e) =>
                      setFormData({ ...formData, brandId: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">برانڈ منتخب کریں</option>
                    {mockBrands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      مقدار
                    </label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={formData.quantity}
                      onChange={(e) =>
                        setFormData({ ...formData, quantity: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      قیمت
                    </label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={formData.unitPrice}
                      onChange={(e) =>
                        setFormData({ ...formData, unitPrice: e.target.value })
                      }
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  {editingId ? "اپڈیٹ کریں" : "شامل کریں"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Products Table */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>مصنوعات کی فہرست</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>نام</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>زمرہ</TableHead>
                    <TableHead>برانڈ</TableHead>
                    <TableHead>مقدار</TableHead>
                    <TableHead>قیمت</TableHead>
                    <TableHead>اقدام</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell className="text-sm text-slate-500">
                        {product.sku}
                      </TableCell>
                      <TableCell>
                        {
                          mockCategories.find((c) => c.id === product.categoryId)
                            ?.name
                        }
                      </TableCell>
                      <TableCell>
                        {mockBrands.find((b) => b.id === product.brandId)?.name}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-sm font-medium ${
                            product.quantity < 10
                              ? "bg-orange-100 text-orange-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {product.quantity}
                        </span>
                      </TableCell>
                      <TableCell className="font-semibold">
                        {formatCurrency(product.unitPrice)}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(product)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
