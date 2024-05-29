/**
 * Citation for the following file:
 * Date: 5/24/2024
 * Copied from create-react-app reportWebVitals.js
 * Source URL: https://github.com/react-cosmos/create-react-app-example/blob/master/src/reportWebVitals.js
 */
const reportWebVitals = onPerfEntry => {
if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
    });
}
};

export default reportWebVitals;
  