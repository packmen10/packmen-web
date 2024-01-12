import { useEffect } from "react";

export function useOutsideAlerter(ref,stateFun,extraFun) {
useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        stateFun(false)
        extraFun('')
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}