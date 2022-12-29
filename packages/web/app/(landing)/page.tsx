"use client";

import { MDXProvider } from "@mdx-js/react";
import type { MDXComponents } from "mdx/types";
import dynamic from "next/dynamic";
import styles from "./page.module.css";
import Hero from "./views/hero/hero";
import heading from "../components/heading/heading";
import Solution, { Block, BigNumber } from "./views/solution/solution";
import Roadmap from "./views/roadmap/roadmap";

const components: MDXComponents = {
  h2: heading.H2,
  Hero,
  Problem: dynamic(import("./views/problem/problem")),
  Category: dynamic(import("../components/category/category")),
  Solution,
  Block,
  BigNumber,
  Roadmap,
  Card: dynamic(import("../components/card/card")),
  Mbr: dynamic(import("../components/mobile-break/mobile-break")),
};

export default function Home() {
  const Content = dynamic(import(`./content/en.mdx`));

  return (
    <main className={styles.main}>
      <MDXProvider components={components}>
        <Content />
      </MDXProvider>
    </main>
  );
}
