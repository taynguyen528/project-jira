// import antd components
import { Drawer } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/index";
import { drawerActions } from "../../store/quanLyDrawer/drawerSlice";

export function CustomDrawer() {
  let dispatch = useAppDispatch();

  let { isDrawerOpen, DrawerContent } = useAppSelector(
    (state) => state.drawerSlice
  );

  const onClose = () => {
    dispatch(drawerActions.closeDrawer());
  };

  return (
    <Drawer
      placement="right"
      closable={false}
      onClose={onClose}
      open={isDrawerOpen}
      key="right"
      size="large"
    >
      {DrawerContent}
    </Drawer>
  );
}
