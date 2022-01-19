interface CutTextI {
    text: string
    symbolsQtty: number
}
const cutDownText = ({text, symbolsQtty}:CutTextI):string => {
    if (typeof text === 'string' && typeof symbolsQtty === 'number') {
      return text.length > symbolsQtty
        ? text.slice(0, symbolsQtty) + '...'
        : text;
    } else {
        return ''
    }
  }

export default cutDownText;