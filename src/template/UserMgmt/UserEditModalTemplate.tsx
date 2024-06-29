/* import antd components */
import { Button, Form, Input } from "antd";
import {
  LockOutlined,
  MailOutlined,
  MobileOutlined,
  IdcardOutlined,
} from "@ant-design/icons";

/* import local components*/
import Label from "../../components/Label/Label";
import toastifyUtils from "../../utils/toastifyUtils";

/* import local interfaces */
import { IUserActionProps, UserUpdate } from "types";

/* import local service */
import { userAPI } from "../../api";

export const UserEditModalTemplate = ({
  user,
  onSuccess,
}: IUserActionProps) => {
  const onFinish = (value: UserUpdate) => {
    let userEdit = { ...value, id: user.userId };
    userAPI
      .editUser(userEdit)
      .then((res) => {
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
      name="registerForm"
      className="register-form w-full"
      onFinish={onFinish}
      layout="vertical"
      size="large"
      initialValues={{
        email: `${user.email}`,
        name: `${user.name}`,
        password: `${user.password}`,
        confirmPassword: `${user.password}`,
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
          // {
          //   pattern: /^[A-Za-z\s]*$/i,
          //   message: "${name} only accepts text, and char. Please input again.",
          // },
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
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Enter your passwords"
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
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Enter the confirmation passwords"
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
            pattern: /^(?:\d*)$/,
            message: "${name} only accepts number. Please input again",
          },
        ]}
      >
        <Input prefix={<MobileOutlined />} placeholder="0897831245" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="register-form-button mt-3 text-lg font-semibold"
        >
          Update User
        </Button>
      </Form.Item>
    </Form>
  );
};
