import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"

export default function Modal({ title, isOpen, onClose, children }) {
  // TODO: Add a close icon. Refer to the design
  // TODO: Make fullscreen on mobile https://headlessui.dev/react/dialog#styling-the-dialog
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
        <Dialog.Overlay className="fixed inset-0 bg-black-neutral-1000 opacity-30" />
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl bg-white-neutral-0 rounded-2xl">
              <Dialog.Title as="h3" className="font-bold text-center text-black-neutral-1000 text-header">
                {title}
              </Dialog.Title>
              <div className="mt-6">{children}</div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
