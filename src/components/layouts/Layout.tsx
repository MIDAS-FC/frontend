import { useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";
import * as S from "./Styles/Layout.style";

function Layout() {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <>
      <Header />
      <S.MainContent>
        <SideBar />
        <S.Content>
          <TransitionGroup component={null}>
            <CSSTransition
              key={location.key}
              classNames="fade"
              timeout={500}
              nodeRef={nodeRef}
            >
              <div ref={nodeRef}>
                <Outlet />
              </div>
            </CSSTransition>
          </TransitionGroup>
        </S.Content>
      </S.MainContent>
      <Footer />
    </>
  );
}

export default Layout;
