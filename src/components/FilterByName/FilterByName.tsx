import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

export const FilterByName = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate({
    from: "/characters",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onNameChange = useCallback(
    (newName: string) => {
      navigate({
        search: (prev) => ({ ...prev, name: newName }),
      });
    },
    [navigate]
  );

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      onNameChange(inputValue);
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [inputValue, onNameChange]);

  return (
    <div>
      <label htmlFor="filter-by-name" className="mr-2">
        Name:
      </label>
      <input
        id="filter-by-name"
        data-testid="test-filter-by-name"
        onChange={handleInputChange}
        className="border p-1"
        type="text"
      />
    </div>
  );
};
