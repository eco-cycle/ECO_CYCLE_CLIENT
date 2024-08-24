import React from 'react';
import '../styles/pages/TransactionHistory.scss';

const transactions = [
  {
    date: '2023년 06월 30일',
    location: '경기 용인시 기흥구 어정로',
    items: '플라스틱 4개 외 12개',
    status: '거래 완료',
  },
  {
    date: '2023년 06월 30일',
    location: '경기 용인시 기흥구 어정로',
    items: '플라스틱 4개 외 12개',
    status: '거래 중',
  },
  {
    date: '2023년 06월 19일',
    location: '경기 용인시 기흥구 어정로',
    items: '플라스틱 4개 외 12개',
    status: '거래 완료',
  },
  {
    date: '2023년 06월 19일',
    location: '경기 용인시 기흥구 어정로',
    items: '플라스틱 4개 외 12개',
    status: '거래 완료',
  },
  {
    date: '2023년 06월 11일',
    location: '경기 용인시 기흥구 어정로',
    items: '플라스틱 4개 외 12개',
    status: '거래 완료',
  },
  {
    date: '2023년 06월 10일',
    location: '경기 용인시 기흥구 어정로',
    items: '플라스틱 4개 외 12개',
    status: '거래 완료',
  },
];

const TransactionHistory = () => {
  return (
    <div className="transaction-history">
      <header className="transaction-header">
        <div className="title">거래 내역</div>
      </header>

      <div className="transaction-list">
        {transactions.map((transaction, index) => (
          <div key={index} className="transaction-item">
            <div className="transaction-details">
              <div className="transaction-date">{transaction.date}</div>
              <div className="transaction-location">{transaction.location}</div>
              <div className="transaction-items">{transaction.items}</div>
            </div>
            {transaction.status && (
              <div className={`transaction-status ${transaction.status === '거래 완료' ? 'completed' : 'in-progress'}`}>
                {transaction.status}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
