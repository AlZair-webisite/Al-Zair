'use client';

import { CheckCircle2, Clock, Filter, Package, Search, ShoppingBag, Truck } from 'lucide-react';
import { useState } from 'react';

export default function AdminOrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [orders, setOrders] = useState([
    {
      id: 'ORD-9821',
      customer: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      phone: '+91 98765 43210',
      address: 'Sector 62, Noida, UP - 201309',
      items: 'Premium Halasi Dates (500g) x 1',
      total: 450,
      payment: 'UPI / Paid',
      status: 'Delivered',
      date: 'Today, 2:45 PM',
    },
    {
      id: 'ORD-9820',
      customer: 'Rahul Verma',
      email: 'rahul.verma@example.com',
      phone: '+91 91234 56789',
      address: 'Indiranagar, Bengaluru, KA - 560038',
      items: 'Royal Gift Hamper, Almond Stuffed Dates',
      total: 2350,
      payment: 'Card / Paid',
      status: 'Processing',
      date: 'Today, 1:12 PM',
    },
    {
      id: 'ORD-9819',
      customer: 'Amina Khan',
      email: 'amina.khan@example.com',
      phone: '+91 99887 76655',
      address: 'Bandra West, Mumbai, MH - 400050',
      items: 'Ajwa Dates (500g) x 2',
      total: 1700,
      payment: 'COD',
      status: 'Shipped',
      date: 'Yesterday, 6:30 PM',
    },
    {
      id: 'ORD-9818',
      customer: 'Vikram Singh',
      email: 'vikram.singh@example.com',
      phone: '+91 98111 22334',
      address: 'Civil Lines, Jaipur, RJ - 302006',
      items: 'Chocolate Date Bites (400g) x 1',
      total: 420,
      payment: 'COD',
      status: 'Pending',
      date: 'Yesterday, 3:15 PM',
    },
  ]);

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Customer Orders
        </h1>
        <p className="text-xs text-white/60 mt-1">
          Track customer purchases, update shipping statuses, and view delivery details.
        </p>
      </div>

      {/* Toolbar */}
      <div className="rounded-2xl border border-white/10 bg-[#12110e] p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search by Order ID, customer name, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-white/30 outline-none focus:border-[#c49a4a]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          {['All', 'Pending', 'Processing', 'Shipped', 'Delivered'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition ${
                statusFilter === status
                  ? 'bg-[#c49a4a] text-[#12100d]'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl border border-white/10 bg-[#12110e] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 bg-white/5 text-[10px] uppercase tracking-wider text-white/50 font-semibold">
              <tr>
                <th className="px-5 py-3.5">Order ID & Date</th>
                <th className="px-5 py-3.5">Customer Details</th>
                <th className="px-5 py-3.5">Items Purchased</th>
                <th className="px-5 py-3.5">Amount & Payment</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-white/[0.02] transition">
                  <td className="px-5 py-4">
                    <span className="font-mono font-bold text-white block text-xs">{order.id}</span>
                    <span className="text-[10px] text-white/40">{order.date}</span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="font-bold text-white block">{order.customer}</span>
                    <span className="text-[10px] text-white/50 block">{order.phone}</span>
                    <span className="text-[10px] text-white/40 truncate max-w-xs block">
                      {order.address}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-white/70 max-w-xs">{order.items}</td>

                  <td className="px-5 py-4">
                    <span className="font-bold text-[#c49a4a] block">
                      ₹{order.total.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-white/50">{order.payment}</span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                          : order.status === 'Shipped'
                          ? 'bg-purple-500/15 text-purple-400 border-purple-500/30'
                          : order.status === 'Processing'
                          ? 'bg-blue-500/15 text-blue-400 border-blue-500/30'
                          : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className="rounded-lg border border-white/15 bg-[#1b1915] px-2 py-1 text-[11px] text-white outline-none focus:border-[#c49a4a]"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
