import "../../styles/layout.css";

import Header from "./Header";
import Footer from "./Footer";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="page-wrapper">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
