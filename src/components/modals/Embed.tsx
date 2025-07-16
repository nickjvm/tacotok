import {
  Dialog,
  DialogTitle,
  DialogBackdrop,
  DialogPanel,
  Transition,
} from "@headlessui/react";
import EmbeddedPost from "../EmbeddedPost";
import { IoMdClose } from "react-icons/io";

type Props = {
  open: boolean;
  recipe: Recipe;
  setOpen: (open: boolean) => void;
};

export default function EmbedModal({ open, recipe, setOpen }: Props) {
  return (
    <Dialog
      open={open}
      onClose={setOpen}
      className="relative z-50 transition duration-300 ease-out data-closed:opacity-0"
      transition
    >
      <DialogBackdrop className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/50">
        <Transition
          appear
          show={open}
          enter="transition duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition duration-300"
          leaveFrom="scale-100"
          leaveTo="scale-95"
        >
          <DialogPanel className="max-w-xl space-y-2 md:space-y-2 bg-white p-2 pb-0 rounded-lg max-h-full overflow-auto">
            <DialogTitle className="font-bold text-lg relative">
              {recipe.title}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-1/2 -translate-y-1/2 right-0"
              >
                <IoMdClose className="w-5 h-5" />
              </button>
            </DialogTitle>
            <EmbeddedPost url={recipe.embedUrl} />
          </DialogPanel>
        </Transition>
      </DialogBackdrop>
    </Dialog>
  );
}
