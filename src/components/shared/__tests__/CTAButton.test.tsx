import { render, screen } from "@testing-library/react"
import { CTAButton } from "../CTAButton"

describe("CTAButton", () => {
  it("renders children", () => {
    render(<CTAButton href="https://wa.me/123">Falar com WhatsApp</CTAButton>)
    expect(screen.getByText("Falar com WhatsApp")).toBeInTheDocument()
  })

  it("renders as an anchor tag", () => {
    render(<CTAButton href="https://wa.me/123">Click</CTAButton>)
    const link = screen.getByRole("link", { name: "Click" })
    expect(link).toBeInTheDocument()
    expect(link.tagName).toBe("A")
  })

  it("sets href correctly", () => {
    const href = "https://wa.me/5511999999999?text=test"
    render(<CTAButton href={href}>Click</CTAButton>)
    expect(screen.getByRole("link")).toHaveAttribute("href", href)
  })

  it("opens external links in new tab", () => {
    render(<CTAButton href="https://wa.me/123">Click</CTAButton>)
    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("target", "_blank")
    expect(link).toHaveAttribute("rel", "noopener noreferrer")
  })

  it("does not open internal links in new tab", () => {
    render(<CTAButton href="#pricing">Click</CTAButton>)
    const link = screen.getByRole("link")
    expect(link).not.toHaveAttribute("target", "_blank")
  })

  it("does not set rel on internal links", () => {
    render(<CTAButton href="#pricing">Click</CTAButton>)
    const link = screen.getByRole("link")
    expect(link).not.toHaveAttribute("rel")
  })

  it("applies primary variant classes by default", () => {
    render(<CTAButton href="#test">Click</CTAButton>)
    const link = screen.getByRole("link")
    expect(link.className).toContain("bg-[#25D366]")
  })

  it("applies secondary variant classes", () => {
    render(<CTAButton href="#test" variant="secondary">Click</CTAButton>)
    const link = screen.getByRole("link")
    expect(link.className).toContain("border-2")
  })

  it("applies primary variant by explicitly passing it", () => {
    render(<CTAButton href="#test" variant="primary">Click</CTAButton>)
    const link = screen.getByRole("link")
    expect(link.className).toContain("bg-[#25D366]")
  })

  it("accepts custom className", () => {
    render(<CTAButton href="#test" className="custom-class">Click</CTAButton>)
    expect(screen.getByRole("link").className).toContain("custom-class")
  })

  it("renders inline-flex layout classes", () => {
    render(<CTAButton href="#test">Click</CTAButton>)
    const link = screen.getByRole("link")
    expect(link.className).toContain("inline-flex")
    expect(link.className).toContain("items-center")
    expect(link.className).toContain("justify-center")
  })

  it("has rounded-full class", () => {
    render(<CTAButton href="#test">Click</CTAButton>)
    expect(screen.getByRole("link").className).toContain("rounded-full")
  })
})
