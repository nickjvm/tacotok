import {
  Dialog,
  DialogTitle,
  DialogBackdrop,
  DialogPanel,
  Transition,
} from "@headlessui/react";
import Image from "next/image";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};
export default function WelcomeModal({ open, setOpen }: Props) {
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
          <DialogPanel className="max-w-xl space-y-4 md:space-y-8 bg-white p-8 rounded-lg max-h-full overflow-auto">
            <div className=" flex flex-col items-center text-center">
              <DialogTitle className="font-bold text-lg">
                <Image
                  src="/logo-color.png"
                  width={150}
                  height={36}
                  alt="Tacotok"
                  className="h-auto mx-auto mb-4"
                />
                From TikTok to Taco Tuesday
              </DialogTitle>
            </div>
            <p className="mb-4">
              TacoTok is your ultimate destination for the most mouthwatering
              taco recipes that are taking TikTok by storm! We&apos;re on a
              mission to bring you the most creative, delicious, and viral taco
              (or taco-inspired) creations.
            </p>
            <p>
              Each week, we handpick a new standout recipe for you to cook,
              complete with all the ingredients and instructions you need to
              recreate these social media sensations in your own kitchen.
              Whether you&apos;re a taco traditionalist or an adventurous
              foodie, get ready to spice up your Taco Tuesday (or any day!) with
              these finds.
            </p>
            <div className="flex gap-4 items-center justify-center">
              <button
                type="button"
                className="px-8 py-2 border border-black-200 hover:bg-lime-300 transition-colors cursor-pointer"
                onClick={() => setOpen(false)}
              >
                Let&apos;s Go!
              </button>
            </div>
          </DialogPanel>
        </Transition>
      </DialogBackdrop>
    </Dialog>
  );
}
