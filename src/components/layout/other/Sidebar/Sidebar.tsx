import { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { Logo } from '@/components/layout/other';
import { SERVER_URL } from '@/config/global';
import { customerRoutes, routes } from '@/routes';

import styles from './Sidebar.module.scss';
import stylesLogo from '@/components/layout/other/Logo/Logo.module.scss';
import { AuthContext } from '@/providers';
import { useAppSelector } from '@/redux/store';


export interface IRouteItem {
  title: string;
  path: string;
  leaf?: boolean;
  hide?: boolean;
  children?: IRouteItem[];
}
export interface IBusiness {
  name: string;
  phone: string;
  owner: string;
  address: string;
  email: string;
  zipcode: string;
}

const initialBusiness: IBusiness = {
  name: '',
  phone: '',
  owner: '',
  address: '',
  email: '',
  zipcode: '',
};
export function Sidebar() {
  const businessName = useAppSelector(state => state.business.businessName.name);
  const imageLogo = useAppSelector(state => state.images.vendorImages.logoUrl);

  const { account, setIsLogin } = useContext(AuthContext);
  const username = account?.profile?.owner || '';
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  
  const prefixPath = useMemo(() => {
    return pathname.startsWith('/admin') ? '/admin' : '/vendor';
  }, [pathname]);
  const roleRoutes = useMemo(() => {
    return (
      routes.find((route: any) => prefixPath.endsWith(route.path))?.children ||
      customerRoutes
    ) as IRouteItem[];
  }, [prefixPath]);

  const [active, setActive] = useState('');

  const buildPath = (parent: string, child: string) => {
    return child ? `${parent}/${child}` : parent;
  };

  const showSubNavs = (parentItem: IRouteItem) => {
    setActive(parentItem.path === active ? '' : parentItem.path);
    if (!parentItem.children || parentItem.leaf) {
      navigate(buildPath(prefixPath, parentItem.path));
    }
  };

  const renderChildRoute = (children: IRouteItem[], currentPath: string) => {
    return children.map((route: IRouteItem, index: number) =>
      route.children && !route.leaf ? (
        <div key={`${currentPath}-${route.path}-${index}`}>
          <p className={styles.subParentItem}>{route.title}</p>
          <div className={styles.childPanel}>
            {renderChildRoute(
              route.children,
              buildPath(currentPath, route.path),
            )}
          </div>
        </div>
      ) : !route.hide ? (
        <p
          onClick={() => navigate(buildPath(currentPath, route.path))}
          className={
            (!route.path && pathname === currentPath) || (route.path && pathname.startsWith(buildPath(currentPath, route.path)))
              ? clsx(styles.leafItem, styles.activeLeafItem)
              : styles.leafItem
          }
        >
          {route.title}
        </p>
      ) : (
        <></>
      ),
    );
  };

  return (
    <div className={styles.root}>
      {/* <Logo size="small" /> */}
      <div className={styles.brand}>
        {/* <Logo size="medium" /> */}
        {(imageLogo) ? (
          <img
            alt=""
            src={`${SERVER_URL}/${imageLogo}`}
            className={`${styles.imgViewer} ${stylesLogo.mediumLogo}`}
          />
        ) :'logo is not uploaded yet'}
        {(businessName) ? (<p>{businessName}</p>):''}
      </div>
      <div className={styles.navbar}>
        {roleRoutes
          .filter((route: any) => !route.hide)
          .map((route: any, index: number) => (
            <div key={`${route.path}-${index}`} className={styles.navItem}>
              <div
                className={
                  pathname.startsWith(buildPath(prefixPath, route.path))
                    ? clsx(styles.parentItem, styles.activeParentItem)
                    : styles.parentItem
                }
                onClick={() => showSubNavs(route)}
              >
                {route.icon && <>{route.icon}</>}
                <p>{route.title}</p>
              </div>
              {active === route.path && route.children && !route.leaf && (
                <div className={styles.childPanel}>
                  {renderChildRoute(
                    route.children,
                    buildPath(prefixPath, route.path),
                  )}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

