import { Building2, Gem, Ticket, Users, Star, Tag, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";

const dashboardCards = [
  {
    id: 1,
    icon: Building2,
    title: "Branch Management",
    description: "Manage boutique locations, operating hours, and contact details",
    link: "/admin/branches",
    color: "text-[--gold-0]"
  },
  {
    id: 2,
    icon: Gem,
    title: "Product Management",
    description: "Add, edit, and organize jewelry products and collections",
    link: "/admin/products",
    color: "text-[--gold-0]"
  },
  {
    id: 3,
    icon: Ticket,
    title: "Customer Requests",
    description: "Handle service tickets and custom design inquiries",
    link: "/admin/requests",
    color: "text-[--gold-0]"
  },
  {
    id: 4,
    icon: Users,
    title: "User & Role Management",
    description: "Create roles and manage admin user permissions",
    link: "/admin/users",
    color: "text-[--gold-0]"
  },
  {
    id: 5,
    icon: Star,
    title: "Review Management",
    description: "Approve, reject, or moderate customer product reviews",
    link: "/admin/reviews",
    color: "text-[--gold-0]"
  },
  {
    id: 6,
    icon: Tag,
    title: "Category Management",
    description: "Manage product categories and collections",
    link: "/admin/categories",
    color: "text-[--gold-0]"
  },
  {
    id: 7,
    icon: Sparkles,
    title: "Metal Management",
    description: "Manage metal types and purity options",
    link: "/admin/metals",
    color: "text-[--gold-0]"
  },
  {
    id: 8,
    icon: Gem,
    title: "Gem Management",
    description: "Manage gemstone catalog and pricing",
    link: "/admin/gems",
    color: "text-[--gold-0]"
  }
];

export default function AdminDashboard() {
  // Fetch real data for dashboard stats
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: () => apiClient.getProducts()
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => apiClient.getCategories()
  });

  const { data: metals = [] } = useQuery({
    queryKey: ['metals'],
    queryFn: () => apiClient.getMetals()
  });

  const { data: gems = [] } = useQuery({
    queryKey: ['gems'],
    queryFn: () => apiClient.getGems()
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-display font-bold text-foreground mb-2">
          Welcome back, Admin
        </h1>
        <p className="text-muted-foreground">
          Manage your jewelry store operations from this dashboard
        </p>
      </div>

      {/* Quick Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 card-shadow hover:elegant-shadow transition-all">
          <div className="text-sm text-muted-foreground mb-1">Total Products</div>
          <div className="text-3xl font-display font-bold text-[--gold-0]">{products.length}</div>
        </Card>
        <Card className="p-6 card-shadow hover:elegant-shadow transition-all">
          <div className="text-sm text-muted-foreground mb-1">Total Categories</div>
          <div className="text-3xl font-display font-bold text-[--gold-0]">{categories.length}</div>
        </Card>
        <Card className="p-6 card-shadow hover:elegant-shadow transition-all">
          <div className="text-sm text-muted-foreground mb-1">Total Metals</div>
          <div className="text-3xl font-display font-bold text-[--gold-0]">{metals.length}</div>
        </Card>
        <Card className="p-6 card-shadow hover:elegant-shadow transition-all">
          <div className="text-sm text-muted-foreground mb-1">Total Gems</div>
          <div className="text-3xl font-display font-bold text-[--gold-0]">{gems.length}</div>
        </Card>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardCards.map((card) => (
          <Link key={card.id} to={card.link}>
            <Card className="p-8 h-full card-shadow hover:elegant-shadow transition-all duration-300 hover:scale-105 cursor-pointer group">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className={`${card.color} group-hover:scale-110 transition-transform`}>
                  <card.icon className="w-16 h-16" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground">
                  {card.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {card.description}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
