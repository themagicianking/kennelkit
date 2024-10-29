import Select from "react-select";

export function DropdownFilter({ options, placeholder, onChange }) {
  return (
    <Select
      id="filter"
      options={options}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
