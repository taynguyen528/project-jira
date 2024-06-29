// import local interface
import { IProject, IProjectActionBtns } from "../../types/Project.itf";

// import redux
import { useAppDispatch } from "../../store/index";
import { drawerActions } from "../../store/quanLyDrawer/drawerSlice";
import { spinnerActions } from "../../store/quanLySpinner/spinnerSlice";

// import local component
import { ProjMgmtEditTemplate } from "./ProjMgmtEditTemplate";

// import local Service
import { projectApi } from "../../api/projectApi";

// import antd components
import {
  DeleteOutlined,
  FormOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { message, Popconfirm, Tooltip } from "antd";

export function ProjMgmtActionBtnsTemplate({ project }: IProjectActionBtns) {
  let dispatch = useAppDispatch();

  const handleEditProject = (project: IProject) => {
    dispatch(
      drawerActions.handleDrawerOpen(<ProjMgmtEditTemplate project={project} />)
    );
  };
  const handleDeleteProject = () => {
    dispatch(spinnerActions.setLoadingOn());
    projectApi
      .delete(project.id)
      .then((res) => {
        console.log(res);
        dispatch(projectApi.getAllAndDispatch("Project deleted"));
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data.content);
        dispatch(spinnerActions.setLoadingOff());
      });
  };

  return (
    <div className="space-x-2">
      <Tooltip title="Edit Project">
        <button
          onClick={() => {
            handleEditProject(project);
          }}
        >
          <span className="p-2 rounded inline-flex justify-center items-center bg-indigo-500 hover:bg-indigo-400 text-xl text-white transition duration-300 cursor-pointer">
            <FormOutlined />
          </span>
        </button>
      </Tooltip>
      <Popconfirm
        title={
          <span className="text-lg pl-1">
            Are you sure to delete{" "}
            <span className="font-semibold">{project.projectName}</span>?
          </span>
        }
        onConfirm={handleDeleteProject}
        okText="Yes"
        okButtonProps={{
          danger: true,
          type: "default",
          size: "large",
          className: "btn-delete-ok",
        }}
        cancelText="No"
        cancelButtonProps={{
          type: "primary",
          size: "large",
          className: "btn-delete-cancel",
        }}
        icon={<QuestionCircleOutlined className="top-1 text-red-500 text-xl" />}
      >
        <Tooltip title="Delete Project">
          <span className="p-2 rounded inline-flex justify-center items-center bg-red-500 hover:bg-red-600 text-xl text-white transition duration-300 cursor-pointer">
            <DeleteOutlined />
          </span>
        </Tooltip>
      </Popconfirm>
    </div>
  );
}
