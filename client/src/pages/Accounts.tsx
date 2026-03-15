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
import { Plus, Search, Edit2, Trash2 } from "lucide-react";
import { mockAccounts, mockCities } from "@/lib/mockData";
import { formatCurrency, formatDate, searchFilter } from "@/lib/utils";
import { useState as useFormState } from "react";

export default function Accounts() {
  const [accounts, setAccounts] = useState(mockAccounts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    cityId: "",
  });

  const filteredAccounts = useMemo(() => {
    return searchFilter(accounts, searchTerm, ["name", "address"]);
  }, [accounts, searchTerm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.address || !formData.cityId) {
      alert("براہ کرم تمام فیلڈز بھریں");
      return;
    }

    if (editingId) {
      setAccounts(
        accounts.map((acc) =>
          acc.id === editingId
            ? {
                ...acc,
                name: formData.name,
                address: formData.address,
                cityId: parseInt(formData.cityId),
                updatedAt: new Date().toISOString(),
              }
            : acc
        )
      );
    } else {
      const newAccount = {
        id: Math.max(...accounts.map((a) => a.id), 0) + 1,
        name: formData.name,
        address: formData.address,
        cityId: parseInt(formData.cityId),
        balance: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setAccounts([...accounts, newAccount]);
    }

    setFormData({ name: "", address: "", cityId: "" });
    setEditingId(null);
    setIsOpen(false);
  };

  const handleEdit = (account: any) => {
    setEditingId(account.id);
    setFormData({
      name: account.name,
      address: account.address,
      cityId: account.cityId.toString(),
    });
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("کیا آپ یقینی ہیں؟")) {
      setAccounts(accounts.filter((acc) => acc.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">اکاؤنٹس</h1>
          <p className="text-slate-600">اپنے اسٹور اکاؤنٹس اور بیلنس منیج کریں</p>
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
                  setFormData({ name: "", address: "", cityId: "" });
                }}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                نیا اکاؤنٹ
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "اکاؤنٹ میں ترمیم کریں" : "نیا اکاؤنٹ بنائیں"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    اکاؤنٹ کا نام
                  </label>
                  <Input
                    placeholder="اکاؤنٹ کا نام درج کریں"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    پتہ
                  </label>
                  <Input
                    placeholder="پتہ درج کریں"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    شہر
                  </label>
                  <select
                    value={formData.cityId}
                    onChange={(e) =>
                      setFormData({ ...formData, cityId: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">شہر منتخب کریں</option>
                    {mockCities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
                <Button type="submit" className="w-full">
                  {editingId ? "اپڈیٹ کریں" : "بنائیں"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Accounts Table */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>اکاؤنٹس کی فہرست</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>نام</TableHead>
                    <TableHead>پتہ</TableHead>
                    <TableHead>شہر</TableHead>
                    <TableHead>بیلنس</TableHead>
                    <TableHead>تاریخ</TableHead>
                    <TableHead>اقدام</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAccounts.map((account) => (
                    <TableRow key={account.id}>
                      <TableCell className="font-medium">
                        {account.name}
                      </TableCell>
                      <TableCell>{account.address}</TableCell>
                      <TableCell>
                        {mockCities.find((c) => c.id === account.cityId)?.name}
                      </TableCell>
                      <TableCell className="font-semibold text-green-600">
                        {formatCurrency(account.balance)}
                      </TableCell>
                      <TableCell className="text-sm text-slate-500">
                        {formatDate(account.createdAt)}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(account)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(account.id)}
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
