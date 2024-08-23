import React, { useState } from 'react';
import '../styles/pages/CreatePage.scss';

import Graph from '../pages/Graph/Graph';
import Camera from '../components/CollectionPage/Camera';

const CreatePage = () => {
    const [isCamera, setIsCamera] = useState(false)
    const [isGraph, setIsGraph] = useState(true);
    const [response, setIsResponse] = useState(null);

    return (
      <>
        {isCamera && (
          <Camera setIsCamera={setIsCamera} setIsResponse={setIsResponse} />
        )}
        {isGraph && <Graph setIsGraph={setIsGraph} setIsCamera={setIsCamera}/>}
        {
            (!isGraph && !isCamera ) && <div></div>
        }
      </>
    );
};

export default CreatePage;