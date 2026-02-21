import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { PricingToggle } from "@/components/sections/Pricing/PricingToggle";
import type { BillingPeriod } from "@/types/pricing";

describe("PricingToggle", () => {
  it("renders 'Mensal' and 'Anual' labels", () => {
    const onToggle = jest.fn();
    render(<PricingToggle billingPeriod="monthly" onToggle={onToggle} />);
    expect(screen.getByText("Mensal")).toBeInTheDocument();
    expect(screen.getByText("Anual")).toBeInTheDocument();
  });

  it("renders a button with role='switch'", () => {
    const onToggle = jest.fn();
    render(<PricingToggle billingPeriod="monthly" onToggle={onToggle} />);
    const toggle = screen.getByRole("switch");
    expect(toggle).toBeInTheDocument();
  });

  it("has aria-checked='false' when billingPeriod is 'monthly'", () => {
    const onToggle = jest.fn();
    render(<PricingToggle billingPeriod="monthly" onToggle={onToggle} />);
    const toggle = screen.getByRole("switch");
    expect(toggle).toHaveAttribute("aria-checked", "false");
  });

  it("has aria-checked='true' when billingPeriod is 'annual'", () => {
    const onToggle = jest.fn();
    render(<PricingToggle billingPeriod="annual" onToggle={onToggle} />);
    const toggle = screen.getByRole("switch");
    expect(toggle).toHaveAttribute("aria-checked", "true");
  });

  it("calls onToggle with 'annual' when clicked from 'monthly'", () => {
    const onToggle = jest.fn();
    render(<PricingToggle billingPeriod="monthly" onToggle={onToggle} />);
    const toggle = screen.getByRole("switch");
    fireEvent.click(toggle);
    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledWith("annual");
  });

  it("calls onToggle with 'monthly' when clicked from 'annual'", () => {
    const onToggle = jest.fn();
    render(<PricingToggle billingPeriod="annual" onToggle={onToggle} />);
    const toggle = screen.getByRole("switch");
    fireEvent.click(toggle);
    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledWith("monthly");
  });

  it("does NOT render the -20% badge when billingPeriod is 'monthly'", () => {
    const onToggle = jest.fn();
    render(<PricingToggle billingPeriod="monthly" onToggle={onToggle} />);
    expect(screen.queryByText("-20%")).not.toBeInTheDocument();
  });

  it("renders the -20% badge when billingPeriod is 'annual'", () => {
    const onToggle = jest.fn();
    render(<PricingToggle billingPeriod="annual" onToggle={onToggle} />);
    expect(screen.getByText("-20%")).toBeInTheDocument();
  });

  it("calls onToggle when Space key is pressed on the switch", () => {
    const onToggle = jest.fn();
    render(<PricingToggle billingPeriod="monthly" onToggle={onToggle} />);
    const toggle = screen.getByRole("switch");
    fireEvent.keyDown(toggle, { key: " " });
    expect(onToggle).toHaveBeenCalledWith("annual");
  });

  it("calls onToggle when Enter key is pressed on the switch", () => {
    const onToggle = jest.fn();
    render(<PricingToggle billingPeriod="monthly" onToggle={onToggle} />);
    const toggle = screen.getByRole("switch");
    fireEvent.keyDown(toggle, { key: "Enter" });
    expect(onToggle).toHaveBeenCalledWith("annual");
  });

  it("does not call onToggle for unrelated key presses", () => {
    const onToggle = jest.fn();
    render(<PricingToggle billingPeriod="monthly" onToggle={onToggle} />);
    const toggle = screen.getByRole("switch");
    fireEvent.keyDown(toggle, { key: "Tab" });
    expect(onToggle).not.toHaveBeenCalled();
  });

  it("has accessible aria-label on the switch button", () => {
    const onToggle = jest.fn();
    render(<PricingToggle billingPeriod="monthly" onToggle={onToggle} />);
    const toggle = screen.getByRole("switch");
    expect(toggle).toHaveAttribute("aria-label");
  });
});
