import { createIntersectionObserver } from "./intersect-observer";
import { createMutationObserver } from "./mutation-observer";

type InfiniteScrollProps = {
  target: HTMLElement;
  onLoadMore: () => Promise<void>;
  options?: {
    intersection?: IntersectionObserverInit;
    mutation?: MutationObserverInit;
  };
};

export const createInfiniteScroll = ({
  target,
  onLoadMore,
  options = {
    intersection: {
      threshold: 0.1,
      root: null,
      rootMargin: "0px",
    },
    mutation: {
      childList: true,
    },
  },
}: InfiniteScrollProps) => {
  let intersectionObserver: IntersectionObserver | null = null;

  const observeLastItem = () => {
    const lastItem = target.lastElementChild;
    if (!lastItem) return;

    if (intersectionObserver) {
      intersectionObserver.disconnect();
    }

    intersectionObserver = createIntersectionObserver({
      onIntersect: async () => await onLoadMore(),
    });

    intersectionObserver.observe(lastItem);
  };

  const mutationObserver = createMutationObserver({
    onChange: async (mutationRecord) => {
      if (mutationRecord.type === "childList") {
        observeLastItem();
      }
    },
  });

  mutationObserver.observe(target, options.mutation);

  return {
    disconnect: () => {
      intersectionObserver?.disconnect();
      mutationObserver.disconnect();
    },
  };
};
