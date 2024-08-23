import s1 from '../../assets/Shop/고래.jpeg';
import s2 from '../../assets/Shop/쇼핑백.jpeg';
import s3 from '../../assets/Shop/시계.jpeg';
import s4 from '../../assets/Shop/의자.jpeg';
import s5 from '../../assets/Shop/장갑.jpeg';
import s6 from '../../assets/Shop/컵.jpeg';
import s7 from '../../assets/Shop/텀블러.jpeg';
import s8 from '../../assets/Shop/폰케이스.jpeg';
import s9 from '../../assets/Shop/헬멧.jpeg';

const ProductData = {
  products: [
    { id: 1, name: "고래", category: "인형", date: "2023-08-22", likes: 120, seller: "인형공방", price: "10,000", image: s1 },
    { id: 2, name: "쇼핑백", category: "가방", date: "2023-08-20", likes: 85, seller: "나이키", price: "15,000", image: s2 },
    { id: 3, name: "뭔가 시계", category: "잡화", date: "2023-08-21", likes: 95, seller: "어딘가", price: "10,000", image: s3 },
    { id: 4, name: "생각의자", category: "가구", date: "2023-08-19", likes: 75, seller: "목공방", price: "20,000", image: s4 },
    { id: 5, name: "테니스 장갑", category: "잡화", date: "2023-08-22", likes: 110, seller: "윌링텀", price: "10,000", image: s5 },
    { id: 6, name: "뭔가컵", category: "잡화", date: "2023-08-20", likes: 150, seller: "어딘가", price: "10,300", image: s6 },
    { id: 7, name: "뭔가텀블러", category: "잡화", date: "2023-08-18", likes: 130, seller: "텀텀", price: "10,000", image: s7 },
    { id: 8, name: "빡폰", category: "잡화", date: "2023-08-22", likes: 140, seller: "폰폰폰", price: "10,000", image: s8 },
    { id: 9, name: "꽃밭", category: "잡화", date: "2023-08-22", likes: 140, seller: "플라워세상", price: "10,000", image: s9 },
  ],
  categories: ['All', '인형', '가방', '잡화', '가구'] // Ensure this list is present
};

export default ProductData;
