import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";

type CheckBoxButtonsProps = {
  items: string[];
  checked: string[];
  onChange: (items: string[]) => void;
};

const CheckBoxButtons: React.FC<CheckBoxButtonsProps> = ({
  items,
  checked,
  onChange,
}) => {
  const [checkedItems, setCheckedItems] = useState(checked);

  useEffect(() => {
    setCheckedItems(checked);
  }, [checked]);

  const handleToggle = (value: string) => {
    const updatedCheck = checkedItems.includes(value)
      ? checkedItems.filter((i) => i !== value)
      : [...checkedItems, value];

    setCheckedItems(updatedCheck);
    onChange(updatedCheck);
  };

  return (
    <Fragment>
      <FormGroup>
        {items.map((item) => (
          <FormControlLabel
            key={item}
            control={
              <Checkbox
                checked={checkedItems.includes(item)}
                onClick={() => handleToggle(item)}
                color="secondary"
                sx={{ py: 0.7, fontSize: 40 }}
              />
            }
            label={item}
          />
        ))}
      </FormGroup>
    </Fragment>
  );
};

export default CheckBoxButtons;
