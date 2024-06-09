import { PaginationProps } from "antd";
import { Trans } from "react-i18next";

export const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
      return <a><Trans>PREV</Trans></a> ;
    }
    if (type === 'next') {
      return <a><Trans>NEXT</Trans></a>;
    }
    return originalElement;
  };