import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message, Layout, Menu } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { GetCurrentUser } from "../calls/users";
import { setUser } from "../redux/userSlice";
import { HomeOutlined, UserOutlined, LogoutOutlined, UserAddOutlined } from "@ant-design/icons";
import { clearUser } from "../redux/userSlice";
const { Header } = Layout;

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(clearUser());
  };
  const navItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: (
        <Link to="/" className="hover:text-blue-500">
          Home
        </Link>
      ),
    },
    {
      key: "user",
      label: `${user ? user.name : ""}`,
      icon: <UserAddOutlined />,
      children: [
        {
          key: "profile",
          label: (
            <span
              onClick={() => {
                if (user.role === "admin") {
                  navigate("/admin");
                } else if (user.role === "partner") {
                  navigate("/partner");
                } else {
                  navigate("/profile");
                }
              }}
              className="hover:text-blue-500 cursor-pointer"
            >
              My Profile
            </span>
          ),
          icon: <UserOutlined />,
        },
        {
          key: "logout",
          label: (
            <Link
              to="/login"
              onClick={handleLogout}
              className="hover:text-blue-500"
            >
            Log Out
             </Link>
          ),
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];

  const getValidUser = async () => {
    try {
      dispatch(showLoading());
      const response = await GetCurrentUser();
      dispatch(setUser(response.data));
      dispatch(hideLoading());
    } catch (error) {
      dispatch(setUser(null));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getValidUser();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    user && (
      <Layout>
        <Header
          className="d-flex justify-content-between bg-[#A7BEAE] h-fit"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>
            ShookMyBow
          </h3>
          <Menu
            theme="light"
            mode="horizontal"
            items={navItems}
            className="bg-[#A7BEAE] h-fit no-underline"
            style={{
              backgroundColor: "#A7BEAE",
              color: "white",
              borderBottom: "none",
            }}
          />
        </Header>
        <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
          {children}
        </div>
      </Layout>
    )
  );
}

export default ProtectedRoute;
