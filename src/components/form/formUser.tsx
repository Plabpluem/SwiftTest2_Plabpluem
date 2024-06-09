import { Button, DatePicker, Form, Input, Radio, Select } from "antd";
import "./formUser.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addData, reset } from "../../store/slices/userSlice";
import { v4 as uuid } from "uuid";
import { useEffect } from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { FieldTypeForm } from "../../@types/dataType";

const FormUser: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.user);
  const genId = uuid();
  const [form] = Form.useForm();

  const onSubmitHandler = (e: any) => {
    window.alert("Save Success");
    const citizenIdSelect =
      e.citizenId1 + e.citizenId2 + e.citizenId3 + e.citizenId4 + e.citizenId5;
    const nameUser = e.firstname + " " + e.lastname;
    const numberUser = e.prefix + e.phone;
    if (userInfo.editData) {
      const data = {
        ...e,
        key: userInfo.editData.key,
        fullname: nameUser,
        mobile: numberUser,
      };
      dispatch(addData(data));
    } else {
      const data = {
        ...e,
        citizenId: citizenIdSelect,
        key: genId,
        birthday: dayjs(e.birthday),
        fullname: nameUser,
        mobile: numberUser,
      };
      dispatch(addData(data));
    }
    form.resetFields();
  };

  const resetHandler = () => {
    form.resetFields();
    dispatch(reset());
  };

  useEffect(() => {
    if (userInfo.editData) {
      form.setFieldsValue({
        ...userInfo.editData,
        birthday: dayjs(userInfo.editData.birthday),
      });
    }
  }, [userInfo.statusEdit, form, userInfo.editData]);
  return (
    <section className="formContainer">
      <Form
        onFinish={onSubmitHandler}
        initialValues={{ lastname: "" }}
        form={form}
      >
        <div style={{ display: "flex" }}>
          <Form.Item<FieldTypeForm>
            label={t("Title")}
            name="title"
            rules={[{ required: true, message: "Please select your title" }]}
          >
            <Select style={{ width: "100px" }} placeholder={t("Title")}>
              <Select.Option value="mr">Mr.</Select.Option>
              <Select.Option value="ms">Ms.</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item<FieldTypeForm>
            label={t("Firstname")}
            name="firstname"
            rules={[
              { required: true, message: "Please input your firstname!" },
            ]}
          >
            <Input style={{ width: "300px" }} />
          </Form.Item>
          <Form.Item<FieldTypeForm>
            label={t("Lastname")}
            name="lastname"
            rules={[{ required: true, message: "Please input your lastname!" }]}
          >
            <Input style={{ width: "300px" }} />
          </Form.Item>
        </div>
        <div style={{ display: "flex" }}>
          <Form.Item<FieldTypeForm>
            label={t("Birthday")}
            name="birthday"
            rules={[{ required: true }]}
          >
            <DatePicker
              placeholder={t("Date")}
              style={{ backgroundColor: "white" }}
            />
          </Form.Item>
          <Form.Item<FieldTypeForm>
            label={t("Nationality")}
            name="nationality"
            rules={[{ required: true, message: "Please select your national" }]}
          >
            <Select style={{ width: "300px" }} placeholder={t("Please")}>
              <Select.Option value="Thai">{t("Thai")}</Select.Option>
              <Select.Option value="French">{t("French")}</Select.Option>
              <Select.Option value="American">{t("American")}</Select.Option>
            </Select>
          </Form.Item>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Form.Item<FieldTypeForm> label={t("CitizenId")} name="citizenId1">
            <Input
              maxLength={1}
              style={{ width: "100px", textAlign: "center" }}
            />
          </Form.Item>
          <Form.Item<FieldTypeForm> colon={false} label="-" name="citizenId2">
            <Input maxLength={4} style={{ textAlign: "center" }} />
          </Form.Item>
          <Form.Item<FieldTypeForm> colon={false} label="-" name="citizenId3">
            <Input maxLength={5} style={{ textAlign: "center" }} />
          </Form.Item>
          <Form.Item<FieldTypeForm> colon={false} label="-" name="citizenId4">
            <Input maxLength={2} style={{ textAlign: "center" }} />
          </Form.Item>
          <Form.Item<FieldTypeForm>
            colon={false}
            label="-"
            style={{ width: "100px", textAlign: "center" }}
            name="citizenId5"
          >
            <Input maxLength={1} />
          </Form.Item>
        </div>
        <Form.Item<FieldTypeForm>
          label={t("Gender")}
          name="gender"
          rules={[{ required: true }]}
        >
          <Radio.Group>
            <Radio value="Male">{t("Male")}</Radio>
            <Radio value="Female">{t("Female")}</Radio>
            <Radio value="Unisex">{t("Unisex")}</Radio>
          </Radio.Group>
        </Form.Item>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Form.Item
            name="prefix"
            label={t("Phone")}
            rules={[{ required: true }]}
          >
            <Select
              style={{
                width: 100,
              }}
            >
              <Select.Option value="+66">
                <img
                  style={{ width: "15px" }}
                  alt="thai flag"
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg"
                />
                +66
              </Select.Option>
              <Select.Option value="+33">
                <img
                  style={{ width: "15px" }}
                  alt="french flag"
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg"
                />
                +33
              </Select.Option>
              <Select.Option value="+1">
                <img
                  style={{ width: "15px" }}
                  alt="american flag"
                  src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
                />
                +1
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="phone" label="-" colon={false}>
            <Input style={{ width: "400px" }} />
          </Form.Item>
        </div>
        <Form.Item
          name="passport"
          label={t("Passport")}
          style={{ maxWidth: 400 }}
        >
          <Input />
        </Form.Item>
        <div style={{ display: "flex", gap: "13rem" }}>
          <Form.Item
            name="salary"
            label={t("Salary")}
            rules={[{ required: true }]}
            style={{ minWidth: 400 }}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button style={{ margin: "0 3rem" }} onClick={resetHandler}>
              {t("Reset")}
            </Button>
            <Button htmlType="submit">{t("Submit")}</Button>
          </Form.Item>
        </div>
      </Form>
    </section>
  );
};

export default FormUser;
