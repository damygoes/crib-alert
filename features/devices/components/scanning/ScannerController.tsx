import { BarcodeScannerModal } from './BarcodeScannerModal';

export const ScannerController = ({
  visible,
  onBarCodeScanned,
  onCancel,
}: {
  visible: boolean;
  onBarCodeScanned: (event: { data: string }) => void;
  onCancel: () => void;
}) => (
  <BarcodeScannerModal
    visible={visible}
    onCancel={onCancel}
    onBarCodeScanned={onBarCodeScanned}
  />
);
