import AdminLayoutClient from "./AdminLayoutClient";

export const metadata = {
    title: "Dhankar Dragons - Admin",
    description: "Dhankar Dragons Administration Panel",
};

export default function AdminLayout({ children }) {
    return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
