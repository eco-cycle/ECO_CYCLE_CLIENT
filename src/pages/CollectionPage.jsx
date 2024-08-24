import React, { useEffect, useState } from 'react';
import '../styles/pages/CollectionPage.scss';

import backIcon from '../assets/LoginPage/backIcon.svg';
import searchIcon from '../assets/Shop/Search.svg'; // Add search icon
import { useNavigate } from 'react-router-dom';
import { getAllRecycleMyItem, getAllRecycleOtherItem } from '../apis/collection/apis';

const CollectionPage = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('all'); // State for filter
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false); // State for modal
    const [resources, setResources] = useState([]); // Initialize as an array
    const [loading, setLoading] = useState(false); // State for loading

    useEffect(() => {
        const fetchResources = async () => {
            setLoading(true);
            try {
                let res = [];
                if (filter === 'sale') {
                    res = await getAllRecycleMyItem();
                } else if (filter === 'transaction') {
                    res = await getAllRecycleOtherItem();
                }
                // Extract the data from the response
                if (res && res.data && Array.isArray(res.data)) {
                    setResources(res.data);
                } else {
                    console.error('Unexpected API response format:', res);
                    setResources([]);
                }
            } catch (error) {
                console.error('Failed to fetch resources', error);
                setResources([]);
            } finally {
                setLoading(false);
            }
        };

        fetchResources();
    }, [filter]);


    // // Filter resources based on the search query
    // const filteredResources = resources.filter(resource =>
    //     resource.title.toLowerCase().includes(searchQuery.toLowerCase())
    // );

    return (
        <div className="Collection-Wrapper">
            <div className="Collection--Header">
                <img
                    src={backIcon}
                    alt="back-btn"
                    className="Collection--BackIcon"
                    onClick={() => navigate("/")}
                />
                <div className="Collection--Header--Text">자원 거래</div>
                <img
                    src={searchIcon}
                    alt="search-icon"
                    className="Collection--SearchIcon"
                    onClick={() => setIsSearchModalOpen(true)}
                />
            </div>

            <div className="Collection--Filter">
                <button
                    className={`Collection--Filter--Btn ${filter === 'sale' ? 'active' : ''}`}
                    onClick={() => setFilter('sale')}
                >
                    판매하기
                </button>
                <button
                    className={`Collection--Filter--Btn ${filter === 'transaction' ? 'active' : ''}`}
                    onClick={() => setFilter('transaction')}
                >
                    거래하기
                </button>
            </div>

            <div className="Collection--Content">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    resources.map(resource => (
                        <div key={resource.id} className="Resource-Card">
                            <img src={resource.imageUrl} alt={resource.title} className="Resource-Image" />
                            <div className="Resource-Info">
                                <div className="Resource-Location">{resource.location}</div>
                                {resource.createdAt && <div className="Resource-Date">{new Date(resource.createdAt).toLocaleDateString()}</div>}
                                {resource.price !== undefined && <div className="Resource-Price">{resource.price}원</div>}
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="Collection--Create--Btn" onClick={() => navigate("/create")}>
                <span style={{ fontSize: '25px', fontWeight: '700' }}>+</span>
                &nbsp;자원 등록하기
            </div>

            {isSearchModalOpen && (
                <div className="Collection--SearchModal">
                    <div className="Collection--SearchModal--Content">
                        <input
                            type="text"
                            className="Collection--SearchInput"
                            placeholder="원하는 자원을 검색하세요"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                        <button
                            className="Collection--SearchModal--Close"
                            onClick={() => setIsSearchModalOpen(false)}
                        >
                            X
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CollectionPage;