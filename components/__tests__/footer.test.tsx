import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Footer } from "@/components/footer"

// Mock the fetch call so tests don't hit a real network/API
beforeEach(() => {
  global.fetch = jest.fn()
})

afterEach(() => {
  jest.resetAllMocks()
})

describe("Footer", () => {
  it("renders company name and tagline", () => {
    render(<Footer />)
    expect(screen.getByText("Mimaar Associates")).toBeInTheDocument()
    expect(screen.getByText("SUPPLY AND SERVICES")).toBeInTheDocument()
  })

  it("renders contact information", () => {
    render(<Footer />)
    expect(screen.getByText("0300 527 4224")).toBeInTheDocument()
    expect(screen.getByText("mimaarassociates@gmail.com")).toBeInTheDocument()
  })

  it("renders all quick links", () => {
    render(<Footer />)
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "#home")
    expect(screen.getByRole("link", { name: "Services" })).toHaveAttribute("href", "#services")
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "#contact")
  })

  it("submits the newsletter form and shows a success message", async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "You are subscribed." }),
    })

    render(<Footer />)

    const input = screen.getByPlaceholderText("you@example.com")
    fireEvent.change(input, { target: { value: "test@example.com" } })
    fireEvent.click(screen.getByRole("button", { name: "Join" }))

    await waitFor(() => {
      expect(screen.getByText("You are subscribed.")).toBeInTheDocument()
    })

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/newsletter",
      expect.objectContaining({ method: "POST" })
    )
  })

  it("shows an error message when the subscription fails", async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Unable to subscribe." }),
    })

    render(<Footer />)

    fireEvent.change(screen.getByPlaceholderText("you@example.com"), {
      target: { value: "test@example.com" },
    })
    fireEvent.click(screen.getByRole("button", { name: "Join" }))

    await waitFor(() => {
      expect(screen.getByText("Unable to subscribe.")).toBeInTheDocument()
    })
  })
})