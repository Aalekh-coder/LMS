import React from "react";
import { Label } from "../label";
import { Input } from "../input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { Textarea } from "../textarea";

const FormControl = ({ formControls = [], formData, setFormData }) => {
  function renderComponentByType(getControledItem) {
    let element = null;
    const value = formData[getControledItem?.name] || "";

    switch (getControledItem?.componentType) {
      case "input":
        element = (
          <Input
            id={getControledItem?.name}
            name={getControledItem?.name}
            placeholder={getControledItem?.placeholder}
            type={getControledItem?.type}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControledItem?.name]: e.target.value,
              })
            }
          />
        );
        break;

      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControledItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControledItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getControledItem.options && getControledItem.options.length > 0
                ? getControledItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            id={getControledItem?.name}
            name={getControledItem?.name}
            placeholder={getControledItem?.placeholder}
            type={getControledItem?.type}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControledItem?.name]: e.target.value,
              })
            }
          />
        );
        break;

      default:
        element = (
          <Input
            id={getControledItem?.name}
            name={getControledItem?.name}
            placeholder={getControledItem?.placeholder}
            type={getControledItem?.type}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControledItem?.name]: e.target.value,
              })
            }
          />
        );

        break;
    }
    return element;
  }
  return (
    <div className="flex flex-col gap-3">
      {formControls?.map((controlItem) => {
        return (
          <div key={controlItem.name}>
            <Label htmlFor={controlItem?.name}>{controlItem?.label}</Label>
            {renderComponentByType(controlItem)}
          </div>
        );
      })}
    </div>
  );
};

export default FormControl;
