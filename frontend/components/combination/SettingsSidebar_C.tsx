import { FiUser, FiCalendar, FiHelpCircle } from 'react-icons/fi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SettingsSidebar_C() {
  const pathname = usePathname();

  const navItems = [
    {
      title: 'Profile',
      icon: <FiUser className="w-5 h-5" />,
      href: '/settings/profile',
    },
    {
      title: 'Planning',
      icon: <FiCalendar className="w-5 h-5" />,
      href: '/settings/planning',
    },
    {
      title: 'Helper',
      icon: <FiHelpCircle className="w-5 h-5" />,
      href: '/settings/helper',
    },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-64px)] p-4">
      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
} 