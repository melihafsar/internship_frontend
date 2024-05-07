export const showAccordionInProfile = (
  isOpen: boolean,
  formRef: React.RefObject<HTMLDivElement>,
  setState: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setState(!isOpen);
  if (isOpen) return;
  setTimeout(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  }, 100);
};
