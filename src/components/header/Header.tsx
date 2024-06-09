import "./header.scss";
import i18next from "../../i18n";
import { Select } from "antd";
import { useTranslation } from "react-i18next";

const HeaderTranslate: React.FC = () => {
  const { t } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18next.changeLanguage(lng);
  };

  return (
    <Select
      className="selectContainer"
      defaultValue="en"
      onChange={changeLanguage}
      options={[
        { value: "en", label: `${t("EN")}` },
        { value: "th", label: `${t("TH")}` },
      ]}
    />
  );
};

export default HeaderTranslate;
