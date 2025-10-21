import { useState } from "react";

export default function useNavbar() {
  const [isVisible, setIsVisible] = useState(false);
  return { isVisible, setIsVisible };
}