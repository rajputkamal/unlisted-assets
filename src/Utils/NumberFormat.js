export function numberFormat(number) {
    return new Intl.NumberFormat('en-IN', { style: "currency", currency: "INR" }).format(number);
}