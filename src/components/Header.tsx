<<<<<<< HEAD
import { useState, useEffect } from "react";
import { Menu, Search, ShoppingBag, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useQuery } from "@tanstack/react-query";
import { apiClient, CategoryDTO } from "@/lib/api";
import categoryNecklaces from "@/assets/category-necklaces.jpg";
import categoryChains from "@/assets/category-chains.jpg";
import categoryPendants from "@/assets/category-pendants.jpg";
import categoryBangles from "@/assets/category-bangles.jpg";
import categoryEarrings from "@/assets/category-earrings.jpg";
import categoryRings from "@/assets/category-rings.jpg";

// Category image mapping for existing categories
const categoryImageMap: Record<string, any> = {
  "necklaces": categoryNecklaces,
  "chains": categoryChains,
  "pendants": categoryPendants,
  "bangles": categoryBangles,
  "earrings": categoryEarrings,
  "rings": categoryRings,
};

// Default image for new categories
const defaultCategoryImage = categoryRings;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Bridal", href: "#bridal" },
    { label: "Custom Design", href: "#custom" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  // Fetch categories from API
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => apiClient.getCategories()
  });

  // Map API categories to navigation format
  const jewelleryCategories = categories.map((category: CategoryDTO) => ({
    name: category.name,
    href: `/jewellery/${category.name.toLowerCase()}`,
    image: categoryImageMap[category.name.toLowerCase()] || defaultCategoryImage,
  }));

const latestProducts = [
  { id: "P6094", name: "Gold Ring P6094", image: "/placeholder.svg" },
  { id: "K4156", name: "Gold Ring K4156", image: "/placeholder.svg" },
  { id: "T11299", name: "Bracelet 5-T11299", image: "/placeholder.svg" },
  { id: "T5756", name: "Pendant T5756", image: "/placeholder.svg" },
];

=======
import { useState } from "react";
import { Menu, Search, X, ChevronDown, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isJewelleryOpen, setIsJewelleryOpen] = useState(false);

  const jewelleryCategories = [
    { label: "Rings", href: "/category/rings" },
    { label: "Necklaces", href: "/category/necklaces" },
    { label: "Bracelets", href: "/category/bracelets" },
    { label: "Earrings", href: "/category/earrings" },
  ];

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Jewellery", href: "/collections", hasDropdown: true },
    { label: "Bridal", href: "/bridal" },
    { label: "Custom Design", href: "/custom-design" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

>>>>>>> master
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border elegant-shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-accent rounded-md transition-smooth"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo - Centered */}
          <div className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:transform-none">
            <Link to="/" className="text-2xl lg:text-3xl font-display font-bold text-primary tracking-wider">
              New Kalyani Jewellers
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
<<<<<<< HEAD
            <Link
              to="/"
              className="text-sm font-body font-medium text-foreground hover:text-primary transition-smooth relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
            >
              Home
            </Link>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-body font-medium bg-transparent hover:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-primary">
                    Jewellery
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="container mx-auto py-12 px-4">
                      <div className="grid grid-cols-12 gap-8">
                        {/* OUR JEWELLERY Section */}
                        <div className="col-span-3">
                          <h3 className="text-2xl font-display font-bold text-foreground mb-6 uppercase tracking-wide">
                            Our Jewellery
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            {jewelleryCategories.map((category) => (
                              <Link
                                key={category.name}
                                to={category.href}
                                className="group flex flex-col items-center space-y-2 p-2 rounded-lg transition-all hover:bg-accent/30"
                              >
                                <div className="w-16 h-16 rounded-full overflow-hidden bg-card shadow-md group-hover:shadow-lg transition-all group-hover:scale-110">
                                  <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="text-sm font-medium text-foreground text-center">
                                  {category.name}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* LATEST PRODUCTS Section */}
                        <div className="col-span-5">
                          <h3 className="text-2xl font-display font-bold text-foreground mb-6 uppercase tracking-wide">
                            Latest Products
                          </h3>
                          <div className="grid grid-cols-4 gap-4">
                            {latestProducts.map((product) => (
                              <Link
                                key={product.id}
                                to={`/product/${product.id}`}
                                className="group"
                              >
                                <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all">
                                  <div className="aspect-square bg-muted">
                                    <img
                                      src={product.image}
                                      alt={product.name}
                                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                  </div>
                                  <div className="p-2 text-center">
                                    <p className="text-xs font-medium text-foreground">{product.id}</p>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Promotional Image */}
                        <div className="col-span-4">
                          <div className="h-full rounded-lg overflow-hidden shadow-lg">
                            <img
                              src="/placeholder.svg"
                              alt="Featured Collection"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link
              to="/gems"
              className="text-sm font-body font-medium text-foreground hover:text-primary transition-smooth relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
            >
              Gems
            </Link>

            {menuItems.slice(1).map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-body font-medium text-foreground hover:text-primary transition-smooth relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
              >
                {item.label}
              </a>
=======
            {menuItems.map((item) => (
              <div 
                key={item.label}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setIsJewelleryOpen(true)}
                onMouseLeave={() => item.hasDropdown && setIsJewelleryOpen(false)}
              >
                <Link
                  to={item.href}
                  className="text-sm font-body font-medium text-foreground hover:text-primary transition-smooth relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left flex items-center gap-1"
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                </Link>
                {item.hasDropdown && isJewelleryOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-lg shadow-lg py-2 min-w-[200px] z-50 animate-fade-in">
                    {jewelleryCategories.map((category) => (
                      <Link
                        key={category.label}
                        to={category.href}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-accent transition-smooth"
                      >
                        {category.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
>>>>>>> master
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center gap-2">
<<<<<<< HEAD
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Shopping bag">
              <ShoppingBag className="h-5 w-5" />
            </Button>
          </div>
        </div>

=======
            <Button 
              variant="ghost" 
              size="icon" 
              aria-label="Search"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/admin/login">
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label="Admin Login"
              >
                <LogIn className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4 border-t border-border animate-fade-in">
            <form onSubmit={(e) => { e.preventDefault(); const formData = new FormData(e.currentTarget); window.location.href = `/search?q=${formData.get('q')}`; }} className="flex gap-2">
              <input
                type="text"
                name="q"
                placeholder="Search for jewelry..."
                className="flex-1 px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button type="submit">Search</Button>
            </form>
          </div>
        )}

>>>>>>> master
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
<<<<<<< HEAD
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-base font-body font-medium text-foreground hover:text-primary transition-smooth py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="pt-2">
                <div className="text-base font-body font-medium text-foreground pb-2">Jewellery</div>
                <div className="flex flex-col space-y-2 pl-4">
                  {jewelleryCategories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.href}
                      className="text-sm font-body text-muted-foreground hover:text-primary transition-smooth py-1 flex items-center gap-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <img src={category.image} alt={category.name} className="w-6 h-6 rounded-full object-cover" />
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
=======
                <div key={item.label}>
                  <Link
                    to={item.href}
                    className="text-base font-body font-medium text-foreground hover:text-primary transition-smooth py-2 block"
                    onClick={() => !item.hasDropdown && setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.hasDropdown && (
                    <div className="pl-4 mt-2 space-y-2">
                      {jewelleryCategories.map((category) => (
                        <Link
                          key={category.label}
                          to={category.href}
                          className="block text-sm text-muted-foreground hover:text-primary py-1"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {category.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
>>>>>>> master
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
