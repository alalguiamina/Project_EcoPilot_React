type ReportHandler = (metric: unknown) => void;

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (typeof onPerfEntry === "function") {
    import("web-vitals")
      .then((module) => {
        const webVitals = module as {
          onCLS?: (cb: ReportHandler) => void;
          onFID?: (cb: ReportHandler) => void;
          onFCP?: (cb: ReportHandler) => void;
          onLCP?: (cb: ReportHandler) => void;
          onTTFB?: (cb: ReportHandler) => void;
        };

        webVitals.onCLS?.(onPerfEntry);
        webVitals.onFID?.(onPerfEntry);
        webVitals.onFCP?.(onPerfEntry);
        webVitals.onLCP?.(onPerfEntry);
        webVitals.onTTFB?.(onPerfEntry);
      })
      .catch(() => {
        // Ignore if web-vitals fail to load
      });
  }
};

export default reportWebVitals;
