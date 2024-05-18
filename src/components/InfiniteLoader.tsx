import { ReactNode, useEffect, useRef } from "react";

interface InfiniteLoaderProps {
  className?: string;
  loadMore: (shouldReset?: boolean) => void;
  from: number;
  totalElements: number;
  loading: boolean;
  hasError: boolean;
  children: ReactNode;
}

function InfiniteLoader({
  className,
  loadMore,
  from,
  totalElements,
  loading,
  hasError,
  children,
}: InfiniteLoaderProps) {
  const lastElementRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const hasMore = from < totalElements;

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const { isIntersecting } = entry;
      if (isIntersecting && hasMore && !loading && !hasError) loadMore();
    });
  };

  const initObserver = () => {
    observer.current = new IntersectionObserver(handleIntersection, {
      rootMargin: "100px 0px",
    });
    observer.current.observe(lastElementRef.current as Element);
  };

  useEffect(() => {
    if (lastElementRef.current) initObserver();
    return () => {
      observer.current?.disconnect();
    };
  }, [lastElementRef.current, from, loading, hasError]);

  return (
    <div className={className}>
      {children}
      <div ref={lastElementRef} />
    </div>
  );
}

export default InfiniteLoader;
