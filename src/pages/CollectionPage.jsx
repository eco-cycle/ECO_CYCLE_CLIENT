import React, { useState } from 'react';
import '../styles/pages/CollectionPage.scss';

import backIcon from '../assets/LoginPage/backIcon.svg';
import searchIcon from '../assets/Shop/Search.svg'; // Add search icon
import { useNavigate } from 'react-router-dom';

const CollectionPage = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('all'); // State for filter
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false); // State for modal

    // Sample data for resources
    const resources = [
        { id: 1, title: "페트병, 플라스틱류 외 3건", location: "천안시 동남구 상명대길 31", date: null, price: 500, type: 'sale' },
        { id: 2, title: "페트병 8개 외", location: "천안시 동남구 상명대길 31", date: null, price: 300, type: 'transaction' },
        { id: 3, title: "페트병 8개 외", location: "천안시 동남구 상명대길 31", date: null, price: 1000, type: 'transaction' },
        { id: 4, title: "페트병 8개 외", location: "천안시 동남구 상명대길 31", date: null, price: 700, type: 'sale' },
    ];

    // Filter resources based on the selected filter and search query
    const filteredResources = resources.filter(resource => {
        return (filter === 'all' || resource.type === filter) &&
            resource.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

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
                {filteredResources.map(resource => (
                    <div key={resource.id} className="Resource-Card">
                        <div className="Resource-Image"></div>
                        <div className="Resource-Info">
                            <div className="Resource-Title">{resource.title}</div>
                            <div className="Resource-Location">{resource.location}</div>
                            {resource.date && <div className="Resource-Date">{resource.date}</div>}
                            {resource.price && <div className="Resource-Price">{resource.price}원</div>}
                        </div>
                    </div>
                ))}
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
};

export default CollectionPage;
