export const PrinterCommands = {
  begin: '^XA',
  end: '^XZ',
  fieldSeparator: '^FS',
  fieldData: '^FD',
  fieldOffset: (x: string, y: string): string => `^FO${x},${y}`,
  comment: '^FX',
  changeFont: '^CF',
  graphicBox: '^GB',
  reversePrint: '^FR',
  rotate90: '^FWR',
  qrCode: (data: string): string => `^BQR,2,10^FDQA,${data}^FS`,
  rotateNormal: '^FWN',
  printWidth: '^PW9999',
  font: (f: string, height: string, width?: string): string => {
    let fontStr = `^CF${f},${height}`;
    if(!!width) fontStr = `${fontStr},${width}`;
    return fontStr;
  },
  centeredFieldBlock: '^FB830,1,0,C'
}