export const PrinterCommands = {
  begin: '^XA',
  end: '^XZ',
  fieldSeparator: '^FS',
  fieldData: '^FD',
  fieldOrigin: '^FO',
  comment: '^FX',
  changeFont: '^CF',
  graphicBox: '^GB',
  reversePrint: '^FR',
  rotate90: '^FWR',
  qrCode: (data: string) => `^BQR,2,4^FDQA,${data},^FS`
}