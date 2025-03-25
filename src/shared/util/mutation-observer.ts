type MutationObserverProps = {
  onChange: (mutationRecord: MutationRecord) => Promise<void>;
  onError?: (error: unknown) => void;
  options?: MutationObserverInit;
};

export const createMutationObserver = ({
  onChange,
  options = {
    childList: true,
  },
  onError,
}: MutationObserverProps) => {
  const observer = new MutationObserver((mutationRecords) => {
    mutationRecords.forEach((mutationRecord) => {
      try {
        onChange(mutationRecord);
      } catch (error) {
        onError?.(error);
      }
    });
    options;
  });

  return observer;
};
