import { Modal } from 'antd';
import QRCode from 'react-qr-code';

import { useCreateCheckOutPaymentQR } from '@/api/services/stationService';
import { CircleLoading } from '@/components/loading';

export type QRCodeProps = {
  packageId?: any;
  onClose: () => void;
};
export function QRCodeComponent({ packageId, onClose }: QRCodeProps) {
  const { data, isLoading } = useCreateCheckOutPaymentQR(packageId);
  if (isLoading) return <CircleLoading />;
  return (
    <Modal title="QRCode payment" open onCancel={() => onClose()} footer={[]}>
      <QRCode
        size={256}
        style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
        value={JSON.stringify(data)}
        viewBox="0 0 256 256"
      />
    </Modal>
  );
}
