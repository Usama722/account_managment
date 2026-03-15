import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import {
  BarChart3,
  Package,
  Users,
  TrendingUp,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { mockAccounts, mockProducts } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";

export default function Dashboard() {
  const [, setLocation] = useLocation();

  const totalBalance = mockAccounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalProducts = mockProducts.reduce((sum, prod) => sum + prod.quantity, 0);
  const lowStockProducts = mockProducts.filter((p) => p.quantity < 10);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">ڈیش بورڈ</h1>
          <p className="text-slate-600">اپنے انوینٹری اور اکاؤنٹس کا جائزہ لیں</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Balance */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                کل بیلنس
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">
                {formatCurrency(totalBalance)}
              </div>
              <p className="text-xs text-slate-500 mt-2">
                {mockAccounts.length} اکاؤنٹس
              </p>
            </CardContent>
          </Card>

          {/* Total Products */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <Package className="w-4 h-4 text-green-600" />
                کل اسٹاک
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">
                {totalProducts}
              </div>
              <p className="text-xs text-slate-500 mt-2">
                {mockProducts.length} مصنوعات
              </p>
            </CardContent>
          </Card>

          {/* Accounts Count */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                اکاؤنٹس
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">
                {mockAccounts.length}
              </div>
              <p className="text-xs text-slate-500 mt-2">فعال اکاؤنٹس</p>
            </CardContent>
          </Card>

          {/* Low Stock Alert */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-orange-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-orange-600" />
                کم اسٹاک
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {lowStockProducts.length}
              </div>
              <p className="text-xs text-slate-500 mt-2">انتباہات</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Access */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              فوری رسائی
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={() => setLocation("/accounts")}
                className="h-24 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex flex-col items-center justify-center gap-2"
              >
                <Users className="w-6 h-6" />
                اکاؤنٹس منیج کریں
              </Button>
              <Button
                onClick={() => setLocation("/products")}
                className="h-24 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white rounded-lg flex flex-col items-center justify-center gap-2"
              >
                <Package className="w-6 h-6" />
                مصنوعات منیج کریں
              </Button>
              <Button
                onClick={() => setLocation("/transactions")}
                className="h-24 text-lg font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex flex-col items-center justify-center gap-2"
              >
                <TrendingUp className="w-6 h-6" />
                ٹرانزیکشنز
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Products */}
        {lowStockProducts.length > 0 && (
          <Card className="border-0 shadow-lg mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <AlertCircle className="w-5 h-5" />
                کم اسٹاک والی مصنوعات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lowStockProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200"
                  >
                    <div>
                      <p className="font-medium text-slate-900">{product.name}</p>
                      <p className="text-sm text-slate-600">{product.sku}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-orange-600">{product.quantity}</p>
                      <p className="text-xs text-slate-500">اسٹاک</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
