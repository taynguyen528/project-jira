/* import antd components */
import { Form, Input } from "antd";
import {
  LockOutlined,
  MailOutlined,
  MobileOutlined,
  IdcardOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

/* import local components*/
import { Label } from "label";
import { toastifyUtils } from "utils";

/* import local interfaces */
import { IUserActionProps } from "types";

/* import local service */
import { userAPI } from "api";

export const UserEditModalTemplate = ({
  user,
  onSuccess,
}: IUserActionProps) => {
  const onFinish = (value: any) => {
    let userEdit = { ...value, id: user.userId };
    userAPI
      .editUser(userEdit)
      .then(() => {
        toastifyUtils("success", "Update user successfully!");
        onSuccess();
      })
      .catch((err) => {
        toastifyUtils("error", err.response.data.message);
      });
  };

  const labelItem = (labelText: string) => (
    <Label className="text-lg font-medium">{labelText}</Label>
  );

  return (
    <Form
      name="userEditForm"
      className="register-form w-full"
      onFinish={onFinish}
      layout="vertical"
      size="large"
      initialValues={{
        email: `${user.email}`,
        name: `${user.name}`,
        password: "undefined",
        confirmPassword: "undefined",
        phoneNumber: `${user.phoneNumber}`,
      }}
    >
      <Form.Item
        name="email"
        label={labelItem("Email")}
        rules={[
          {
            required: true,
            message: "Please do not leave ${name} empty",
          },
          {
            type: "email",
            message: "Please input correct email format for ${name}",
          },
        ]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Johndoe@email.com"
        />
      </Form.Item>

      <Form.Item
        name="name"
        label={labelItem("User name")}
        rules={[
          {
            required: true,
            message: "Please do not leave ${name} empty",
          },
        ]}
      >
        <Input prefix={<IdcardOutlined />} placeholder="John Doe" />
      </Form.Item>

      <Form.Item
        name="password"
        label={labelItem("Passwords")}
        rules={[
          { required: true, message: "Please do not leave ${name} empty" },
          {
            min: 6,
            message: "Please input password has length greater than 5",
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Enter your passwords"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          visibilityToggle
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label={labelItem("Confirm Passwords")}
        dependencies={["password"]}
        rules={[
          {
            required: true,
            message: "Please do not leave ${name} empty",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Password and Confirm password must be the SAME")
              );
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Enter the confirmation passwords"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          visibilityToggle
        />
      </Form.Item>

      <Form.Item
        name="phoneNumber"
        label={labelItem("Phone Number")}
        rules={[
          {
            required: true,
            message: "Please do not leave ${name} empty",
          },
          {
            pattern: /^[0-9]{10,11}$/,
            message:
              "Invalid phone number. Please use correct format for phone number.",
          },
        ]}
      >
        <Input prefix={<MobileOutlined />} placeholder="0987654321" />
      </Form.Item>
    </Form>
  );
};
