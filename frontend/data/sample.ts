import { UsagePackage } from "@/models/UsagePackage";
import { Role, User } from "@/models/User";

export const sampleUser: User = {
  id: "u12345",
  username: "john_doe",
  email: "john.doe@example.com",
  fullname: "John Doe",
  avatarUrl: "https://example.com/avatar.jpg",
  birthDay: "1990-01-01",
  isEnable: true,
  createdDate: "2025-05-26T08:00:00Z",
  updatedDate: "2025-05-26T09:00:00Z",
  role: Role.ADMIN
};

export const sampleUsagePackages: UsagePackage[] = [
  {
    id: "basic-001",
    name: "Basic Plan",
    descriptions: ["Access to core features", "Email support"],
    price: 9.99,
    daily_limit: 10,
    days_limit: 30,
    is_deleted: false,
    created_date: new Date("2024-01-01"),
    updated_date: new Date("2024-01-10"),
  },
  {
    id: "pro-002",
    name: "Pro Plan",
    descriptions: ["Priority support", "Increased daily usage", "Access to beta features"],
    price: 29.99,
    daily_limit: 100,
    days_limit: 90,
    is_deleted: false,
    created_date: new Date("2024-02-15"),
    updated_date: new Date("2024-03-01"),
  },
  {
    id: "edu-003",
    name: "Educational Plan",
    descriptions: ["Free for students", "Requires verification"],
    price: 0,
    daily_limit: 20,
    days_limit: 180,
    is_deleted: false,
    created_date: new Date("2024-03-10"),
    updated_date: new Date("2024-03-20"),
  },
  {
    id: "legacy-004",
    name: "Legacy Plan",
    descriptions: ["Deprecated package", "No longer supported"],
    price: 19.99,
    daily_limit: 50,
    days_limit: 60,
    is_deleted: true,
    created_date: new Date("2023-05-01"),
    updated_date: new Date("2024-01-01"),
  }
];
