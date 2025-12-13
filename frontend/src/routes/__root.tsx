import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
