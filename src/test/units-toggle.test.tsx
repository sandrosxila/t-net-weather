import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UnitsToggle } from "@/components/units-toggle";
import { UNITS } from "@/api/models";

it("should call onChange with proper argument", async () => {
  const onChange = vi.fn();
  const user = userEvent.setup();

  render(<UnitsToggle units={UNITS.METRIC} onChange={onChange} />);

  const imperialButton = screen.getByRole("button", { name: /imperial/i });

  await user.click(imperialButton);

  expect(onChange).toBeCalledWith(UNITS.IMPERIAL);
});
