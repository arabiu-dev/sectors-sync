import React from "react";
import Select from "react-select";

const NestedDropdown = ({
  options,
  setSelectedOptions,
  selectedOptions,
  setTempHolder,
}) => {
  const flattenOptions = (options, level = 0) => {
    return options.flatMap((option) => [
      createFlattenedOption(option, level),
      ...(option.subOptions
        ? flattenOptions(option.subOptions, level + 3)
        : []),
    ]);
  };

  const createFlattenedOption = (option, level) => {
    return {
      key: option.id,
      label: `${"\u00A0\u00A0".repeat(level)}${option.name}`,
      value: option.id,
      isDisabled: !!option.subOptions,
    };
  };

  const flattenedOptions = flattenOptions(options);

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected.map((i) => i.value));
    setTempHolder(selected.map((i) => ({ id: i.value, name: i.label.trim() })));
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: "black",
      fontWeight: state.data.isDisabled ? "bold" : "normal",
    }),
  };

  return (
    <>
      <label id="sectors-label" className="InputLabel">
        Sectors
      </label>
      <div className="input-container">
        <Select
          aria-labelledby="sectors-label"
          options={flattenedOptions}
          value={flattenedOptions.filter((option) =>
            selectedOptions.includes(option.value)
          )}
          isOptionDisabled={(option) => option.isDisabled}
          isMulti
          onChange={handleSelectChange}
          styles={customStyles}
          getOptionValue={(option) => option.value}
        />
      </div>
    </>
  );
};

export default NestedDropdown;
