import { useMediaQuery } from "react-responsive";

/* https://github.com/contra/react-responsive#easy-mode */
export const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};
export const MobileOrTablet = ({ children }) => {
  const isMobileOrTablet = useMediaQuery({ maxWidth: 959 });
  return isMobileOrTablet ? children : null;
};
export const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 959 });
  return isTablet ? children : null;
};
export const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 960 });
  return isDesktop ? children : null;
};
