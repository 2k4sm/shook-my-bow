import { Tabs } from 'antd';
import Bookings from './Bookings';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const Profile = () => {

      const navigate = useNavigate();
      const { user } = useSelector((state) => state.user);
      useEffect(() => {
        if (user.role === "partner") {
          navigate("/partner");
        } else if (user.role === "admin") {
          navigate("/admin");
        }
      }, []);
      
      const items = [
        {
          key: '1',
          label: 'Bookings',
          children: <Bookings/>,
        },
      ];

    return (
        <>
        <h1>User Profile Page</h1>
            <Tabs defaultActiveKey="2" items={items} />
        </>
    )
}

export default Profile;