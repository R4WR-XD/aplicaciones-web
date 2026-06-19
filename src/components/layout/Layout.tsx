import "../../styles/layout.css";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />

      <div className="layout">
        <Sidebar />

        <main className="content">
          {children}
        </main>
      </div>

      <Footer />
    </>
  );
}