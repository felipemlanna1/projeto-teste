import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { PricingSection } from "@/components/sections/Pricing/PricingSection";

describe("PricingSection", () => {
  it("renders the section heading", () => {
    render(<PricingSection />);
    expect(
      screen.getByText("Planos para Todos os Tamanhos")
    ).toBeInTheDocument();
  });

  it("renders the section subheading", () => {
    render(<PricingSection />);
    expect(
      screen.getByText("Escolha o plano ideal para o seu negocio. Sem taxas ocultas.")
    ).toBeInTheDocument();
  });

  it("renders all three plan names", () => {
    render(<PricingSection />);
    expect(screen.getByText("Basic")).toBeInTheDocument();
    expect(screen.getByText("Pro")).toBeInTheDocument();
    expect(screen.getByText("Enterprise")).toBeInTheDocument();
  });

  it("renders the PricingToggle component with Mensal/Anual labels", () => {
    render(<PricingSection />);
    expect(screen.getByText("Mensal")).toBeInTheDocument();
    expect(screen.getByText("Anual")).toBeInTheDocument();
  });

  it("renders the toggle switch with role='switch'", () => {
    render(<PricingSection />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("defaults to monthly billing, showing Pro plan price as R$ 97", () => {
    render(<PricingSection />);
    expect(screen.getByText("R$ 97")).toBeInTheDocument();
  });

  it("does NOT render -20% badge by default (monthly billing)", () => {
    render(<PricingSection />);
    expect(screen.queryByText("-20%")).not.toBeInTheDocument();
  });

  it("switches to annual billing when toggle is clicked, showing discounted price", () => {
    render(<PricingSection />);
    const toggle = screen.getByRole("switch");
    fireEvent.click(toggle);
    expect(screen.getByText("R$ 78")).toBeInTheDocument();
    expect(screen.queryByText("R$ 97")).not.toBeInTheDocument();
  });

  it("shows the -20% badge after switching to annual billing", () => {
    render(<PricingSection />);
    const toggle = screen.getByRole("switch");
    fireEvent.click(toggle);
    expect(screen.getByText("-20%")).toBeInTheDocument();
  });

  it("switching back to monthly restores the original prices", () => {
    render(<PricingSection />);
    const toggle = screen.getByRole("switch");
    fireEvent.click(toggle);
    fireEvent.click(toggle);
    expect(screen.getByText("R$ 97")).toBeInTheDocument();
    expect(screen.queryByText("R$ 78")).not.toBeInTheDocument();
  });

  it("renders the 'Popular' badge on the Pro plan", () => {
    render(<PricingSection />);
    expect(screen.getByText("Popular")).toBeInTheDocument();
  });

  it("renders 'Custom' for the Enterprise plan in monthly billing", () => {
    render(<PricingSection />);
    expect(screen.getByText("Custom")).toBeInTheDocument();
  });

  it("renders 'Custom' for the Enterprise plan in annual billing", () => {
    render(<PricingSection />);
    const toggle = screen.getByRole("switch");
    fireEvent.click(toggle);
    expect(screen.getByText("Custom")).toBeInTheDocument();
  });

  it("renders the section with proper aria-labelledby attribute", () => {
    render(<PricingSection />);
    const section = screen.getByRole("region");
    expect(section).toHaveAttribute("aria-labelledby", "pricing-heading");
  });
});
