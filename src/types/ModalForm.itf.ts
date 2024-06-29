import { FormInstance } from "antd";

export interface IModalProps {
  open: boolean;
  modalContent: React.ReactNode;
  headerContent: React.ReactNode;
  width: "auto" | number;
  form: null | FormInstance;
  maskClosable: null | boolean;
  onClose?: () => void;
  onOK?: () => void;
}
