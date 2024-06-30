/* import antd components */
import { Modal } from "antd";

/* import redux */
import { useAppDispatch, useAppSelector } from "store";
import { modalActions } from "modalSlice";

export const CustomModal = () => {
  let dispatch = useAppDispatch();
  let { open, modalContent, headerContent, width } = useAppSelector(
    (state) => state.modalSlice.modalProps
  );
  const onCancel = () => {
    dispatch(modalActions.closeModal());
  };

  return (
    <Modal
      title={headerContent || "Modal"}
      centered
      closable={true}
      open={open}
      onOk={() => {
        console.log("Ok");
      }}
      onCancel={onCancel}
      width={width}
      footer={null}
      maskClosable={false}
      destroyOnClose={true}
    >
      {modalContent}
    </Modal>
  );
};
