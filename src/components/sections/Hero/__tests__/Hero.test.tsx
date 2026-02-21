import { render, screen } from "@testing-library/react"
import { Hero } from "../Hero"

describe("Hero", () => {
  it("renders as a section element", () => {
    const { container } = render(<Hero />)
    expect(container.querySelector("section")).toBeInTheDocument()
  })

  it("renders an h1 heading", () => {
    render(<Hero />)
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
  })

  it("renders WhatsApp text in the h1 headline", () => {
    render(<Hero />)
    const h1 = screen.getByRole("heading", { level: 1 })
    expect(h1.textContent).toMatch(/WhatsApp/i)
  })

  it("renders primary CTA with WhatsApp href", () => {
    render(<Hero />)
    const links = screen.getAllByRole("link")
    const waLink = links.find((l) => l.getAttribute("href")?.includes("wa.me"))
    expect(waLink).toBeInTheDocument()
  })

  it("renders secondary CTA linking to pricing", () => {
    render(<Hero />)
    const links = screen.getAllByRole("link")
    const pricingLink = links.find((l) => l.getAttribute("href") === "#pricing")
    expect(pricingLink).toBeInTheDocument()
  })

  it("renders the subheadline paragraph with Automatize", () => {
    render(<Hero />)
    expect(screen.getByText(/Automatize/i)).toBeInTheDocument()
  })

  it("renders the eyebrow badge", () => {
    render(<Hero />)
    expect(screen.getByText(/Automação via WhatsApp/i)).toBeInTheDocument()
  })

  it("renders primary CTA label text", () => {
    render(<Hero />)
    expect(screen.getByText(/Falar com WhatsApp/i)).toBeInTheDocument()
  })

  it("renders secondary CTA label text", () => {
    render(<Hero />)
    expect(screen.getByText(/Ver Planos/i)).toBeInTheDocument()
  })

  it("primary CTA opens in a new tab", () => {
    render(<Hero />)
    const links = screen.getAllByRole("link")
    const waLink = links.find((l) => l.getAttribute("href")?.includes("wa.me"))
    expect(waLink).toHaveAttribute("target", "_blank")
    expect(waLink).toHaveAttribute("rel", "noopener noreferrer")
  })

  it("secondary CTA does not open in a new tab", () => {
    render(<Hero />)
    const links = screen.getAllByRole("link")
    const pricingLink = links.find((l) => l.getAttribute("href") === "#pricing")
    expect(pricingLink).not.toHaveAttribute("target", "_blank")
  })

  it("renders the CTA group with aria-label", () => {
    render(<Hero />)
    expect(screen.getByRole("group", { name: /Ações principais/i })).toBeInTheDocument()
  })

  it("renders exactly two CTA links", () => {
    render(<Hero />)
    expect(screen.getAllByRole("link")).toHaveLength(2)
  })
})
