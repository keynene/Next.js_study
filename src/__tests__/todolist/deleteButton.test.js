import DeleteButton from "@/app/todolist/deleteButton";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe("DeleteButton Component", () => {
  it("mocks useRouter correctly", () => {
    const mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });
    render(<DeleteButton id={1} />);
    
    expect(useRouter).toHaveBeenCalled(); // useRouter 호출 여부 확인
  });

  it("renders the delete button with correct value attribute", () => {
    render(<DeleteButton id={1} />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("value", "x");
  });

  it("calls fetch and router.refresh on button click", async () => {
    const mockRefresh = jest.fn();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: "Deleted" }),
      })
    );
  
    useRouter.mockReturnValue({ refresh: mockRefresh });
  
    render(<DeleteButton id={1} />);
  
    const button = screen.getByRole("button");
    fireEvent.click(button);
  
    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}lists/1`,
      { method: "DELETE" }
    );
  
    await screen.findByRole("button");
    expect(mockRefresh).toHaveBeenCalled();
  });
});
