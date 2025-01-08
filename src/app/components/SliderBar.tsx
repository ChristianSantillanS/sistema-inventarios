"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutGrid,
  Package,
  Tag,
  User,
  Bell,
  ChevronDown,
  ChevronRight,
  Menu as MenuIcon,
} from "lucide-react";

const SliderBar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menus = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutGrid className="w-5 h-5" />,
    },
    {
      name: "Productos",
      path: "/productos",
      icon: <Package className="w-5 h-5" />,
      submenus: [
        { name: "Ver Productos", path: "/productos" },
        { name: "Agregar Producto", path: "/productos/nuevo" },
      ],
    },
    {
      name: "Categorías",
      path: "/categorias",
      icon: <Tag className="w-5 h-5" />,
      submenus: [
        { name: "Ver Categorías", path: "/categorias" },
        { name: "Agregar Categoría", path: "/categorias/nuevo" },
      ],
    },
    {
      name: "Proveedores",
      path: "/proveedores",
      icon: <MenuIcon className="w-5 h-5" />,
      submenus: [
        { name: "Ver Proveedores", path: "/proveedores" },
        { name: "Agregar Proveedor", path: "/proveedores/nuevo" },
      ],
    },
    {
      name: "Usuarios",
      path: "/usuarios",
      icon: <User className="w-5 h-5" />,
      submenus: [
        { name: "Ver Usuarios", path: "/usuarios" },
        { name: "Agregar Usuario", path: "/usuarios/nuevo" },
      ],
    },
    {
      name: "Alertas",
      path: "/alertas",
      icon: <Bell className="w-5 h-5" />,
    },
  ];

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-16"
      } bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-64px)] transition-all duration-300 border-r border-gray-200 dark:border-gray-800`}
    >
      <div className="flex items-center h-14 px-4 border-b border-gray-200 dark:border-gray-800">
        <button
          className={`${
            isOpen ? "ml-auto" : "mx-auto"
          } text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <MenuIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="h-[calc(100vh-114px)] overflow-y-auto">
        <div className="px-3 py-2">
          {isOpen && (
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Navegación
            </p>
          )}
        </div>

        <nav className="space-y-1 px-3">
          {menus.map((menu) => (
            <div key={menu.name}>
              <Link
                href={menu.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  pathname === menu.path
                    ? "bg-red-500 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                onClick={(e) => {
                  if (menu.submenus) {
                    e.preventDefault();
                    setExpanded((prev) =>
                      prev === menu.name ? null : menu.name
                    );
                  }
                }}
              >
                <span className="flex-shrink-0">{menu.icon}</span>
                {isOpen && (
                  <>
                    <span className="text-sm font-medium">{menu.name}</span>
                    {menu.submenus && (
                      <span className="ml-auto">
                        {expanded === menu.name ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </span>
                    )}
                  </>
                )}
              </Link>
              {isOpen && menu.submenus && expanded === menu.name && (
                <div className="mt-1 ml-6 space-y-1">
                  {menu.submenus.map((submenu) => (
                    <Link
                      key={submenu.name}
                      href={submenu.path}
                      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                        pathname === submenu.path
                          ? "bg-red-500 text-white"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {submenu.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default SliderBar;