import { useEffect } from "react";
import { useUtil } from "@/context/UtilContext";
import { createPortal } from "react-dom";
import Spinner from "./Spinner";

interface LoaderProps {
  showLoading?: boolean;
}

const Loader = ({ showLoading }: LoaderProps) => {
  const { loading } = useUtil();

  const isLoading = loading || showLoading;

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return isLoading
    ? createPortal(<Spinner />, document.getElementById("loader")!)
    : null;
};

export default Loader;
