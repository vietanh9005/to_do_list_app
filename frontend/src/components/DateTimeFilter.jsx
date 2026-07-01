import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Options } from "@/lib/data.js";

const DateTimeFilter = ({ dateQuery, setDateQuery }) => {
  const selectedOption =
    Options.find((option) => option.value === dateQuery) ?? Options[0];

  return (
    <Combobox
      items={Options}
      value={selectedOption}
      itemToStringLabel={(option) => option.label}
      itemToStringValue={(option) => option.value}
      onValueChange={(option) => {
        if (option) {
          setDateQuery(option.value);
        }
      }}
    >
      <ComboboxInput
        placeholder="Select an option"
        className="bg-indigo-100 w-30"
      />
      <ComboboxContent className="bg-indigo-100">
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(option) => (
            <ComboboxItem
              key={option.value}
              value={option}
              className="data-highlighted:bg-indigo-200"
            >
              {option.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};

export default DateTimeFilter;
