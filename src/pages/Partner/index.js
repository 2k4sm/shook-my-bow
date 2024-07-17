import { Tabs } from 'antd';
import TheatreList from './TheatreList';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const Partner = () => {
      const navigate = useNavigate();
      const { user } = useSelector((state) => state.user);
      
      useEffect(() => {
        if (user.role === "user") {
          navigate("/");
        } else if (user.role === "admin") {
          navigate("/admin");
        }
      }, []);
      const items = [
        {
          key: '1',
          label: 'Theatres',
          children: <TheatreList/>,
        }
        
      ];

    return (
        <>
        <h1>Partner Page</h1>
            <Tabs defaultActiveKey="2" items={items} />
        </>
    )
}

export default Partner;