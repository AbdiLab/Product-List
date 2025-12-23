export default function numberFormatter(value: number) {
  return Intl.NumberFormat(undefined, { currency: "USD", style: "currency" }).format(value);
}
