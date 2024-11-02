import Select from "react-select";
import PropTypes from "prop-types";

export function DropdownFilter({
  options,
  placeholder,
  onChange,
  isDisabled,
}) {
  return (
    <Select
      id="filter"
      options={options}
      placeholder={placeholder}
      onChange={onChange}
      isDisabled={isDisabled}
    />
  );
}

DropdownFilter.propTypes = {
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  defaultValue: PropTypes.string,
};
