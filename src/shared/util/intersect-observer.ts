export type IntersectObserverProps = {
  onIntersect: (entry: IntersectionObserverEntry) => Promise<void>;
  onError?: (error: unknown) => void;
  options?: IntersectionObserverInit;
};

export const createIntersectionObserver = ({
  onIntersect,
  options = {
    threshold: 0.1,
    root: null,
    rootMargin: "0px",
  },
  onError,
}: IntersectObserverProps): IntersectionObserver => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        try {
          onIntersect(entry);
        } catch (error) {
          onError?.(error);
        }
      }
    });
  }, options);

  return observer;
};
