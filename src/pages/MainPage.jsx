import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Apis from '../apis/Apis';

const MainPage = () => {
    const navigate = useNavigate();
    
  useEffect(() => {
    Apis.get("/api/v1/member/new").then((response) => {
      if (response.data.data.new) {
        navigate("/location");
      }
    });
  }, []);


    return (
        <div>
            
        </div>
    );
};

export default MainPage;