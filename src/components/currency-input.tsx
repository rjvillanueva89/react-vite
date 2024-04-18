import {
  NumberFormatBase,
  NumberFormatBaseProps,
  useNumericFormat,
} from "react-number-format"

interface Props extends NumberFormatBaseProps {}

export const CurrencyInput = ({ value, onValueChange, customInput }: Props) => {
  const props = useNumericFormat({
    thousandSeparator: ",",
    decimalScale: 2,
    fixedDecimalScale: true,
    value,
    onValueChange,
    customInput,
  })

  return <NumberFormatBase {...props} />
}
