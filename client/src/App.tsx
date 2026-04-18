import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Book from "./pages/Book";
import Diagnostic from "./pages/Diagnostic";
import Contact from "./pages/Contact";
import Demo from "./pages/Demo";
import Layout from "./components/Layout";

// Tracks every element injected into <body> by third-party scripts (i.e. the chat widget).
// Anything that is not #root, <script>, <style>, or <noscript> is considered a widget node.
const widgetNodes = new Set<HTMLElement>();

function isWidgetNode(el: Node): el is HTMLElement {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName.toLowerCase();
  if (tag === "script" || tag === "style" || tag === "noscript") return false;
  if (el.id === "root") return false;
  return true;
}

function applyWidgetVisibility(show: boolean) {
  widgetNodes.forEach((el) => {
    el.style.setProperty("display", show ? "" : "none", "important");
  });
}

// Start observing immediately so we catch the widget nodes as they are injected.
const bodyObserver = new MutationObserver((mutations) => {
  mutations.forEach((m) => {
    m.addedNodes.forEach((node) => {
      if (isWidgetNode(node)) {
        widgetNodes.add(node as HTMLElement);
        // Apply current visibility immediately upon detection.
        const isHome = window.location.pathname === "/";
        (node as HTMLElement).style.setProperty("display", isHome ? "" : "none", "important");
      }
    });
  });
});
bodyObserver.observe(document.body, { childList: true });

function ChatWidgetVisibility() {
  const [location] = useLocation();
  useEffect(() => {
    applyWidgetVisibility(location === "/");
  }, [location]);
  return null;
}

function Router() {
  return (
    <Layout>
      <ChatWidgetVisibility />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/book" component={Book} />
        <Route path="/booked" component={Diagnostic} />
        <Route path="/contact" component={Contact} />
        <Route path="/demo" component={Demo} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
