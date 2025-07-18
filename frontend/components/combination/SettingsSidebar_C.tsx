import { FiUser, FiCalendar, FiHelpCircle } from 'react-icons/fi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Constant from '@/configs/Constant';

export default function SettingsSidebar_C() {
  const pathname = usePathname();

  const navItems = [
    {
      title: 'Profile',
      icon: <FiUser className="w-5 h-5" />,
      href: Constant.Page.UserProfileSettingPage,
    },
    {
      title: 'Planning',
      icon: <FiCalendar className="w-5 h-5" />,
      href: Constant.Page.UserPlanningSettingPage,
    },
    {
      title: 'Helper',
      icon: <FiHelpCircle className="w-5 h-5" />,
      href: Constant.Page.UserHelperSettingPage,
    },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-[calc(100vh-64px)] p-4 transition-colors duration-300">
      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
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