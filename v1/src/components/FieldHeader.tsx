import React from "react";
import { Button, ButtonDropdown } from "@agility/plenum-ui";
import { IconChevronDown } from "@tabler/icons-react";

interface Props {
  fieldConfig: {
    readOnly: boolean;
  };
  attachment: any;
  handleRemove: () => void;
  handleSelect: () => void;
}

const FieldHeader = ({
  fieldConfig,
  attachment,
  handleRemove,
  handleSelect,
}: Props) => {
  return (
    <div className="flex w-full items-center justify-between pb-1 font-muli">
      <div className="flex items-center" />
      {fieldConfig.readOnly !== true && (
        <div className="top-buttons">
          {attachment ? (
            <ButtonDropdown
              button={{
                icon: "CollectionIcon",
                label: "Browse",
                size: "sm",
                onClick: () => handleSelect(),
                actionType: "secondary",
              }}
              dropDown={{
                label: "",
                id: "dropdown-1",
                CustomDropdownTrigger: (
                  <IconChevronDown
                    className="h-5 w-5 text-purple-600"
                    stroke={2}
                  />
                ),
                items: [
                  [
                    {
                      icon: "TrashIcon",
                      label: "Remove",
                      isEmphasized: true,
                      onClick: () => handleRemove(),
                      key: "trash",
                    },
                  ],
                ],
              }}
            />
          ) : (
            <Button
              icon="FolderDownloadIcon"
              label="Browse"
              size="sm"
              onClick={() => handleSelect()}
              actionType="secondary"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FieldHeader;
