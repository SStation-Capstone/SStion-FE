import { Button, Modal } from 'antd';

import StaffManagerList from '@/pages/staff/staff-list.user';

export type PackagesFormProps = {
  clickOne?: any;
  onClose: () => void;
};
export function StationStaff({ clickOne, onClose }: PackagesFormProps) {
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
      <StaffManagerList check={clickOne} />
    </Modal>
  );
}
