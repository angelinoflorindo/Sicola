'use client';

import 'katex/dist/katex.min.css';
import {BlockMath, InlineMath} from "react-katex"
 
type Props = {
  latex: string;
  inline?: boolean;
};

export function Formula({ latex, inline = false }: Props) {
  if (inline) {
    return <InlineMath math={latex} />;
  }

  return <BlockMath math={latex} />;
}
