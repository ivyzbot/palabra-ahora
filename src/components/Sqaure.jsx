import { useEffect, useState } from "react";

export default function Sqaure({
  index,
  letter,
  selectedLetters,
  setSelectedLetters,
  islocked,
  words,
}) {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(false);
  }, [words]);

  function handleSqaureClick() {
    if (!islocked) {
      if (isSelected) {
        //remove
        const newSelectedLetters = selectedLetters.filter(
          (l) => JSON.stringify(l) !== JSON.stringify(index)
        );
        setSelectedLetters(newSelectedLetters);
      } else {
        //selected
        const newSelectedLetters = [...selectedLetters];
        newSelectedLetters.push(index);
        setSelectedLetters(newSelectedLetters);
      }
      setIsSelected(!isSelected);
    }
  }

  return (
    <div
      onClick={handleSqaureClick}
      className={`h-10 w-10 border text-center font-bold flex items-center justify-center ${
        islocked
          ? "bg-warning text-primary-content"
          : isSelected
          ? "bg-secondary text-primary-content"
          : null
      }`}
    >
      {letter}
    </div>
  );
}
