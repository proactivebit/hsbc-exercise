import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

interface Props {
  name?: string;
}

export const FilterByName = ({ name }: Props) => {
  const [inputValue, setInputValue] = useState(name ?? "");
  const navigate = useNavigate({
    from: "/app/characters",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onNameChange = useCallback(
    (newName: string) => {
      navigate({
        search: (prev) => ({ ...prev, page: 1, name: newName }),
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

  useEffect(() => {
    setInputValue(name ?? "");
  }, [name]);

  return (
    <div>
      <label htmlFor="filter-by-name" className="mr-2">
        Name:
      </label>
      <input
        id="filter-by-name"
        data-testid="test-filter-by-name"
        onChange={handleInputChange}
        className="border rounded px-2 py-1"
        type="text"
        value={inputValue}
      />
    </div>
  );
};
