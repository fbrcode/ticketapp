import { useState, useEffect } from "react";
import flagsmith from "flagsmith";
import { useFlagsmith } from "@/components/FlagsmithProvider";

export const useFeatureFlag = (
  flagName: string,
  defaultValue: boolean = true
) => {
  const [isEnabled, setIsEnabled] = useState(defaultValue);
  const { isInitialized } = useFlagsmith();

  useEffect(() => {
    if (isInitialized) {
      setIsEnabled(flagsmith.hasFeature(flagName) ?? defaultValue);
    }
  }, [flagName, defaultValue, isInitialized]);

  return isEnabled;
};
