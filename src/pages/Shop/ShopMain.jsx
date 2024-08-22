import React from 'react';
import ProductCard from './ProductCard';
import "../../styles/pages/Shop/ShopMain.scss";

const products = [
  {
    id: 1,
    name: "스마일꽃",
    category: "keyring",
    date: "2023-08-22",
    likes: 120,
    seller: "EcoShop",
    price: "10,000원"
  },
  {
    id: 2,
    name: "스잔지방친구들",
    category: "keyring",
    date: "2023-08-20",
    likes: 85,
    seller: "UpcycleHub",
    price: "10,000원"
  },
  {
    id: 3,
    name: "포켓친구들",
    category: "keyring",
    date: "2023-08-21",
    likes: 95,
    seller: "GreenCrafts",
    price: "10,000원"
  },
  {
    id: 4,
    name: "무궁화배지",
    category: "keyring",
    date: "2023-08-19",
    likes: 75,
    seller: "ReMakeIt",
    price: "10,000원"
  },
  {
    id: 5,
    name: "산토끼열쇠고리",
    category: "keyring",
    date: "2023-08-22",
    likes: 110,
    seller: "EcoShop",
    price: "10,000원"
  },
  {
    id: 6,
    name: "귀여운토끼",
    category: "keyring",
    date: "2023-08-20",
    likes: 150,
    seller: "UpcycleHub",
    price: "10,000원"
  },
  {
    id: 7,
    name: "캐릭터세트",
    category: "keyring",
    date: "2023-08-18",
    likes: 130,
    seller: "GreenCrafts",
    price: "10,000원"
  },
  {
    id: 8,
    name: "만화주인공",
    category: "keyring",
    date: "2023-08-21",
    likes: 90,
    seller: "ReMakeIt",
    price: "10,000원"
  },
  {
    id: 9,
    name: "컬러풀플라워",
    category: "keyring",
    date: "2023-08-22",
    likes: 140,
    seller: "EcoShop",
    price: "10,000원"
  }
];
const ShopMain = () => {
  return (
    <div className='shop-container'>
      <div className='shop-head'>
        <h1>Upcycleling Shop</h1>
        <div>Search</div>
      </div>
      <div className="shop-main">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>

  );
};

export default ShopMain;
