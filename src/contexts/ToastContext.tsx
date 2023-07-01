"use client";
import Image from "next/image";
import { createContext, ReactNode, useContext } from "react";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";
import logo from "@/src/statics/images/logo.png";
import { BiLinkExternal } from "react-icons/bi";
import { motion } from "framer-motion";
export enum TOAST_TYPE {
  SUCCESS,
  ERROR,
}

type ToastContextType = {
  showToast: (
    type: TOAST_TYPE,
    title: string,
    subtitle: string,
    explorer: string | null,
    hash: string
  ) => void;
};

export const ToastContext = createContext<ToastContextType | null>(null);
export function useToastContext() {
  return useContext(ToastContext);
}

type Props = {
  children: ReactNode;
};

export default function ToastProvider({ children }: Props) {
  function showToast(
    type: TOAST_TYPE,
    title: string,
    subtitle: string,
    explorer: string | null,
    hash: string
  ) {
    toast.custom(
      (t) => {
        const containerClass = `overflow-hidden relative max-w-md w-full ${
          type === TOAST_TYPE.SUCCESS ? "bg-green-100/40" : "bg-red-100/40"
        } shadow-lg backdrop-blur-md rounded-md pointer-events-auto flex p-4 pr-6 justify-between items-center`;
        const titleClass = `${
          type === TOAST_TYPE.SUCCESS ? "text-green-400" : "text-red-400"
        } font-bold`;

        const sliderClass = `${
          type === TOAST_TYPE.SUCCESS ? "bg-green-400" : "bg-red-400"
        } absolute left-0 bottom-0 h-1.5`;
        return (
          <motion.div
            key={hash}
            initial={{ translateX: "-1000px" }}
            animate={{ translateX: 0 }}
            transition={{ ease: "backInOut", duration: 0.7 }}
            exit={{ translateX: "-1000px" }}
            className={containerClass}
          >
            <div className="flex-1 w-0">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Image className="h-12 w-12" src={logo} alt="" />
                </div>
                <div className="ml-3 flex-1">
                  <p className={titleClass}>{title}</p>
                  <p className="mt-1 text-sm text-slate-300">{subtitle}</p>
                </div>
              </div>
            </div>
            {explorer && hash && (
              <a href={`${explorer}tx/${hash}`} target="_blank">
                <BiLinkExternal
                  size={20}
                  className="text-slate-200 hover:animate-wiggle"
                  onClick={() => toast.dismiss(t.id)}
                />
              </a>
            )}

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 5.5, ease: "linear" }}
              className={sliderClass}
            />
          </motion.div>
        );
      },
      {
        duration: 5000,
      }
    );
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toaster position="bottom-left" />
      {children}
    </ToastContext.Provider>
  );
}
