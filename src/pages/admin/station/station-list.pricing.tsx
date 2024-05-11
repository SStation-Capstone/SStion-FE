import { Button, Modal } from 'antd';

import PricingManagerList from '@/pages/pricing/pricing-list.container';

export type PackagesFormProps = {
  clickOne?: any;
  onClose: () => void;
};
export function StationPricing({ clickOne, onClose }: PackagesFormProps) {
  return (
    <Modal
      open
      width={1300}
      onCancel={() => onClose()}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
      ]}
    >
      <PricingManagerList check={clickOne} />
    </Modal>
  );
}
