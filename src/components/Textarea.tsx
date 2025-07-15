"use client";

import cn from "@/utils/cn";
import MdEditor, { MDEditorProps } from "@uiw/react-md-editor";

type Props = {
  label: string;
  name: string;
  className?: string;
  onChange?: (value: string) => void;
} & MDEditorProps;

export default function Textarea({ label, className, ...props }: Props) {
  return (
    <div
      data-color-mode="light"
      className={cn("flex flex-col gap-1", className)}
    >
      <label className="label" htmlFor={props.id}>
        {label}
      </label>
      <MdEditor
        {...props}
        textareaProps={{
          name: props.name,
        }}
        // hideToolbar
        className="border border-gray-200 rounded w-full p-2"
        previewOptions={{
          disallowedElements: ["script", "style", "iframe", "object", "embed"],
          className: "prose",
        }}
      />
    </div>
  );
}
