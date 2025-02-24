# Copilot Instructions

When you create a new reusable React component, make
sure you add a Flagsmith feature flag to it.
Only do this for React components that you create.
The below is an example for the start of a component
called MyComponentName.

```tsx
import { useFeatureFlag } from "@/hooks/useFeatureFlag";
import { FeatureFlag } from "@/types/features";

const MyComponentName = () => {
  const isEnabled = useFeatureFlag(FeatureFlag.SomeFeature, true);

  if (!isEnabled) return <div></div>;

  return <div>{/* Your component code here */}</div>;
};
```

For charting components, always add "use client";

When adding new functionality, make sure you add tests where appropriate.
