let showLoader = () => {};
let hideLoader = () => {};

export const setLoaderHandlers = (showFn, hideFn) => {
  showLoader = showFn;
  hideLoader = hideFn;
};

export const loaderOn = () => showLoader();
export const loaderOff = () => hideLoader();
