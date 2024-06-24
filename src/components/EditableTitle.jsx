import { ActionIcon, TextInput } from "@mantine/core"
import { Check } from "lucide-react"

export default function EditableTitle({
  isEditMode,
  titleValue,
  actions,
  onSubmit,
  errorMsg,
  inputRef,
  fontSize,
}) {
  return (
    <div>
      {isEditMode ? (
        <form
          onSubmit={onSubmit}
          className="flex gap-2 items-center"
          ref={inputRef}
        >
          <TextInput
            defaultValue={titleValue}
            {...actions}
            autoFocus
            variant="unstyled"
            className={`border-b font-semibold p-0 ${
              isEditMode ? "" : "border-transparent"
            }`}
            styles={{
              wrapper: { "--input-fz": `${fontSize}px` },
            }}
          />
          <ActionIcon type="submit" variant="default">
            <Check />
          </ActionIcon>

          <span className="text-xs text-red-500">{errorMsg}</span>
        </form>
      ) : (
        <TextInput
          readOnly
          value={titleValue}
          variant="unstyled"
          className={`border-b font-semibold p-0 ${
            isEditMode ? "" : "border-transparent"
          }`}
          styles={{
            wrapper: { "--input-fz": `${fontSize}px` },
          }}
        />
      )}
    </div>
  )
}
